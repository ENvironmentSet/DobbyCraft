import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { NavigationScreenProp } from 'react-navigation';

const CloseIcn = require('../assets/x.png');

interface SafeBuildingProps {
  navigation: NavigationScreenProp<{}>;
}

const SafeBuildingScreen: React.FC<SafeBuildingProps> = ({ navigation }) => {
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
          height: 100,
          paddingRight: 20,
          paddingTop: 20,
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <FastImage source={CloseIcn} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
      />
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
