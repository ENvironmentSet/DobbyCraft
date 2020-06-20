import React from 'react';
import { StyleSheet, ViewStyle, View, SafeAreaView, Alert } from 'react-native';
import AuthHeader from '../components/AuthHeader';
import Button from '../components/Button';
import { NavigationScreenProp } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

interface SignUpHomeProps {
  navigation: NavigationScreenProp<{}>;
}

const SignUpHomeScreen: React.FC<SignUpHomeProps> = ({ navigation }) => {
  const onClickSkipButtonConfirm = () =>
    Alert.alert(
      'Are you sure?',
      `You need to mark your home to use "I'm Safe!" `,
      [
        {
          text: 'No',
          style: 'destructive',
        },
        { text: 'Yes', onPress: () => navigation.navigate('SignUpFin') },
      ],
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader
          headerText="Where is your home?"
          descText={`We manage your personal information anonymously ${'\n'} By setting the location, you can check how much you have ${'\n'} been home with your friends`}
          isShowSkip
          onClickSkipButton={onClickSkipButtonConfirm}
        />
        <View style={{ flex: 3 }}></View>
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <View style={{ width: '100%', paddingHorizontal: 30 }}>
        <Button
          buttonLabel="SIGN UP"
          onClickButton={() => navigation.navigate('SignUpFin')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUpHomeScreen;

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
    height: '100%',
  },
});
