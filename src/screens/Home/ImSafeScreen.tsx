import React, { useEffect } from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import BoxedShare from '../../components/SharedBox';
import { useUserData } from '../../User';
import { getCountedTime } from '../StayedTime';

const BackIcn = require('../../assets/back.png');

interface SafeBuildingProps {
  navigation: NavigationScreenProp<{}>;
}

const ImSafeScreen: React.FC<SafeBuildingProps> = ({ navigation }) => {
  const { name, home: { address } = { address: 'Nowhere' } } = useUserData();

  useEffect(() => {
    if (address === 'Nowhere') {
      Alert.alert(
        'Notification',
        'You need to set your home to use this feature, will you?',
        [
          {
            text: 'Confirm',
            onPress: () => console.log('go to home set page'),
          },
        ],
        { cancelable: true },
      );
    }
  }, [address]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 0.5,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableWithoutFeedback
          style={{ marginRight: 'auto' }}
          onPress={() => navigation.navigate('Home')}>
          <FastImage source={BackIcn} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
        <Text
          style={{
            marginRight: 'auto',
            marginLeft: '32%',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          I'm Safe
        </Text>
      </View>
      <View style={{ flex: 10, width: '100%', marginTop: 30 }}>
        <LinearGradient
          colors={['#0074df', '#264191', '#1f3678']}
          style={{
            width: '100%',
            height: 500,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            alignItems: 'center',
          }}>
          <View style={{ marginTop: 100, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>I have been at</Text>
            <Text style={{ color: '#fff', fontSize: 20 }}>home for</Text>
            <Text style={{ color: '#fff', fontSize: 100 }}>
              {getCountedTime()}
            </Text>
            <Text style={{ color: '#fff', fontSize: 20 }}>minutes</Text>
            <Text style={{ color: '#fff', fontSize: 20 }}>{address}</Text>
          </View>
          <View
            style={{
              marginTop: 'auto',
              flexDirection: 'row',
              marginRight: 'auto',
              marginLeft: 15,
              marginBottom: 10,
            }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>#StopTheSpread</Text>
            <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>
              #StayHome
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13,
          }}>
          <Text
            style={{
              marginTop: 'auto',
              marginLeft: 'auto',
              marginBottom: 10,
              marginRight: 10,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            @{name}
          </Text>
        </View>
        <BoxedShare
          WhatsappMessage="https://www.hackjunction.com/concepts/junction"
          FacebookShareURL="https://www.hackjunction.com/concepts/junction"
          FacebookShareMessage="I have been at home fo (num) hours , (num) minutes (STRING) -By SafeMe Application"
          TwitterShareURL="https://www.hackjunction.com/concepts/junction"
          TwitterShareMessage="I have been at home fo (num) hours , (num) minutes (STRING) -By SafeMe Application"
          TwitterViaAccount="NvironmentE"
          NativeShareTitle="SafeMe Application Shared"
          NativeShareMessage="I have been at home fo (num) hours , (num) minutes (STRING) -By SafeMe Application"
          NativeShareURL="https://www.hackjunction.com/concepts/junction"
        />
      </View>
    </SafeAreaView>
  );
};

export default ImSafeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  cardView: {},
});
