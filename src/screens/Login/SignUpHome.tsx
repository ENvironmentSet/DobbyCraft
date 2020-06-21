import React, { useState, useEffect } from 'react';
import { StyleSheet, ViewStyle, View, SafeAreaView, Alert } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Button from '../../components/Button';
import { NavigationScreenProp } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import request from '../../utils/request';
import { useUserData, useUserDataUpdater } from '../../User';

const marker = require('../../assets/marker.png');

interface SignUpHomeProps {
  navigation: NavigationScreenProp<{}>;
}

const SignUpHome: React.FC<SignUpHomeProps> = ({ navigation }) => {
  const setUserData = useUserDataUpdater();
  const { name, password } = useUserData();
  const [latitude, setLatitude] = useState(37.5030415);
  const [longitude, setLongitude] = useState(126.946423);
  const [latitudeDelta, setLatitudeDelta] = useState(0.001);
  const [longitudeDelta, setLongitudeDelta] = useState(0.001);
  const [userAddr, setUserAddr] = useState('');
  const [userFullAddr, setUserFullAddr] = useState('');
  const onClickSkipButtonConfirm = () =>
    Alert.alert(
      'Are you sure?',
      `You need to mark your home to use "I'm Safe!" `,
      [
        {
          text: 'No',
          style: 'destructive',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await request<{ result: 0 | 1 }>('auth/user', {
              method: 'POST',
              body: `username=${name}&password=${password}&latitude=0&longitude=0&address=&isHomeSet=0`,
            });

            setUserData({
              home: {
                latitude: String(latitude),
                longitude: String(longitude),
                address: userAddr,
              },
            });
            navigation.navigate('SignUpFin');
          },
        },
      ],
    );

  useEffect(() => {
    Geolocation.getCurrentPosition(async info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
  }, []);

  useEffect(() => {
    async function f() {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyApHwjvMnawrDV2x0u3dHSw0rpdR1w0rAU&language=en`,
      );

      if (response.ok) {
        // HTTP 상태 코드가 200~299일 경우
        // 응답 몬문을 받습니다(관련 메서드는 아래에서 설명).
        let {
          results: [{ address_components, formatted_address }],
        } = await response.json();

        console.log(address_components);
        setUserAddr(
          address_components.find(({ types }: { types: string[] }) =>
            types.includes('political'),
          ).short_name,
        );
        setUserFullAddr(formatted_address);
      }
    }

    f();
  }, [latitude, longitude]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader
          headerText="Where is your home?"
          descText={`We manage your personal information anonymously ${'\n'} By setting the location, you can check how much you have ${'\n'} been home with your friends`}
          isShowSkip
          onClickSkipButton={onClickSkipButtonConfirm}
        />
        <View style={{ flex: 3 }} />
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
          onRegionChangeComplete={({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }) => {
            setLatitude(latitude);
            setLongitude(longitude);
            setLatitudeDelta(latitudeDelta);
            setLongitudeDelta(longitudeDelta);
          }}>
          <Marker
            title={userFullAddr}
            image={marker}
            coordinate={{ latitude, longitude }}
          />
        </MapView>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 30 }}>
        <Button
          buttonLabel="SIGN UP"
          onClickButton={async () => {
            await request<{ result: 0 | 1 }>('auth/user', {
              method: 'POST',
              body: `username=${name}&password=${password}&latitude=${latitude}&longitude=${longitude}&address=${userAddr}&isHomeSet=1`,
            });

            setUserData({
              home: {
                latitude: String(latitude),
                longitude: String(longitude),
                address: userAddr,
              },
            });
            navigation.navigate('SignUpFin');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUpHome;

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
    top: 175,
    width: '100%',
    height: '85%',
  },
});
