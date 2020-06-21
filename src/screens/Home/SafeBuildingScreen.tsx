import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { NavigationScreenProp } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import { getWidth } from '../../constants/size';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import AgreementPolicy from '../../components/AgreementPolicy';
import useAsyncEffect from '../../utils/useAsyncEffect';
import request from '../../utils/request';
import { useUserData } from '../../User';

const CloseIcn = require('../../assets/x.png');

const marker = require('../../assets/marker.png');

interface SafeBuildingProps {
  navigation: NavigationScreenProp<{}>;
}

interface Building {
  buildingIdx: number;
  buildingName: string;
  longitude: string;
  latitude: string;
}

interface BuildingDetail {
  buildingName: string;
  buildingIdx: number;
  safetyLevel: string;
  isReviewed: boolean;
  checkItems: {
    thermal: string;
    mask: string;
    disinfection: string;
  };
}

const SafeBuildingScreen: React.FC<SafeBuildingProps> = ({ navigation }) => {
  useEffect(() => {
    Geolocation.getCurrentPosition(async info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
  }, []);

  const { name } = useUserData();

  const [latitude, setLatitude] = useState(37.5030415);
  const [longitude, setLongitude] = useState(126.946423);
  const [isSeen, setIsSeen] = useState(false);
  const [isLongSeen, setIsLongSeen] = useState(false);

  const [buildings, setBuildings] = useState<Building[]>([]);

  useAsyncEffect(async () => {
    const { buildingList } = await request<{ buildingList: Building[] }>(
      'buildings',
      { method: 'GET' },
    );

    setBuildings(buildingList);
  }, [latitude, longitude]);

  const [selectedBuilding, setSelectedBuilding] = useState<
    BuildingDetail | undefined
  >();

  const [field1, setField1] = useState(0);
  const [field2, setField2] = useState(0);
  const [field3, setField3] = useState(0);
  const [field4, setField4] = useState(0);
  const [field5, setField5] = useState(0);
  const [field6, setField6] = useState(0);

  return (
    <View style={styles.mapWrapper}>
      <View
        style={{
          flex: 0.5,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: 999,
          height: 110,
          paddingRight: 20,
          paddingTop: 20,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (isLongSeen) setIsLongSeen(false);
            else if (isSeen) setIsSeen(false);
            else navigation.goBack();
          }}>
          <FastImage source={CloseIcn} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        {buildings.map(building => (
          <Marker
            image={marker}
            title={building.buildingName}
            coordinate={{
              latitude: Number(building.latitude),
              longitude: Number(building.longitude),
            }}
            key={building.buildingIdx}
            onPress={async () => {
              const buildingDetail = await request<BuildingDetail>(
                `buildings/${building.buildingIdx}`,
                { method: 'POST', body: `username=${name}` },
              );

              setLatitude(Number(building.latitude));
              setLongitude(Number(building.longitude));

              setSelectedBuilding({
                ...buildingDetail,
                buildingIdx: building.buildingIdx,
              });
              setIsSeen(true);
            }}
          />
        ))}
      </MapView>
      <Modal
        isVisible={isSeen}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={() => {
          setIsSeen(false);
        }}
        onBackButtonPress={() => {
          setIsSeen(false);
        }}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            height: getWidth(348),
            backgroundColor: '#fff',
            paddingTop: getWidth(32),
            paddingHorizontal: getWidth(20),
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            {selectedBuilding?.buildingName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Safety Level
              </Text>
              <Text
                style={{
                  fontSize:
                    selectedBuilding?.safetyLevel === 'UNKNOWN' ? 30 : 60,
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}>
                {selectedBuilding?.safetyLevel}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'rgba(51, 51, 51, 0.7)',
                }}>
                out of 5
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <FastImage
                  source={
                    selectedBuilding?.checkItems.thermal === 'Y'
                      ? require('../../assets/after.png')
                      : require('../../assets/before.png')
                  }
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>
                  Thermal Device
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <FastImage
                  source={
                    selectedBuilding?.checkItems.mask === 'Y'
                      ? require('../../assets/after.png')
                      : require('../../assets/before.png')
                  }
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>
                  Mask Required
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <FastImage
                  source={
                    selectedBuilding?.checkItems.disinfection === 'Y'
                      ? require('../../assets/after.png')
                      : require('../../assets/before.png')
                  }
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>
                  Regular disinfection
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 40 }}>
            {selectedBuilding?.isReviewed ? (
              <Button
                buttonLabel="I've already reviewed"
                onClickButton={() => {
                  setIsSeen(false);
                }}
                isGray
              />
            ) : (
              <Button
                buttonLabel="REVIEW HERE"
                onClickButton={() => {
                  setIsSeen(false);
                  setIsLongSeen(true);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
      {isLongSeen && (
        <View
          style={{
            width: '100%',
            height: '96%',
            backgroundColor: '#fff',
            marginTop: 'auto',
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 80,
              marginHorizontal: 30,
            }}>
            Start your review
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 40,
              marginHorizontal: 30,
            }}>
            {selectedBuilding?.buildingName}
          </Text>
          <View style={{ flex: 1, marginHorizontal: 30, marginTop: 50 }}>
            <ScrollView>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                1. Are the elevator buttons in the building covered with
                antibacterial film?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField1(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField1(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField1(2)}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                2. Is the sanitizer placed all over the building?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField2(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField2(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField2(2)}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                3. Does disinfection run or a regular?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField3(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField3(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField3(2)}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                4. Is the thermal sensing camera is at the entrance to the
                building?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField4(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField4(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField4(2)}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                5. Is the clinical thermometer is at the entrance to the
                building?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField5(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField5(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField5(2)}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                6. Do Most People wear masks ?
              </Text>
              <AgreementPolicy
                label="Yes"
                onActivationChange={() => setField6(5)}
              />
              <AgreementPolicy
                label="No"
                onActivationChange={() => setField6(1)}
              />
              <AgreementPolicy
                label="Unable to know"
                onActivationChange={() => setField6(2)}
              />
            </ScrollView>
          </View>
          <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
            <Button
              buttonLabel="SUBMIT"
              onClickButton={async () => {
                const { success } = await request<{ success: 0 | 1 }>(
                  'buildings',
                  {
                    method: 'POST',
                    body: `username=${name}&buildingIdx=${selectedBuilding?.buildingIdx}&field1=${field1}&field2=${field2}&field3=${field3}&field4=${field4}&field5=${field5}&field6=${field6}`,
                  },
                );

                if (!success) {
                  Alert.alert(
                    'Error',
                    "Can't send review",
                    [
                      {
                        text: 'Confirm',
                      },
                    ],
                    { cancelable: false },
                  );
                }
                setIsLongSeen(false);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SafeBuildingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
