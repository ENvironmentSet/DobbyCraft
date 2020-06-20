import AsyncStorage from "@react-native-community/async-storage";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo'
import axios from "axios";
import { observer, Provider } from "mobx-react";
import React from "react";
import {
	Alert,
	BackHandler,
	NativeModules,
	Platform,
	StyleSheet,
	View,
	TouchableOpacity,
	YellowBox,
} from "react-native";
import FastImage from "react-native-fast-image";
import Permissions from "react-native-permissions";
import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator,
	createSwitchNavigator,
	NavigationActions,
	NavigationContainerComponent,
	NavigationScreenOptions,
	NavigationScreenProp,
} from "react-navigation";
// import TabButton from "./src/components/TabButton";
// import fonts from "./src/constants/fonts";

// import stores from "./src/stores";

let currentIndex: number = 0;

export const { exitApp } = NativeModules;

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

@observer
class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  navigation = React.createRef<NavigationContainerComponent>();

  componentDidMount = async () => {
    if (Platform.OS === 'android')
      await Permissions.request('storage', { type: 'always' });

    NetInfo.fetch().then(state => {
      // Not Connected Network.
      !state.isConnected &&
        Alert.alert(
          '알림',
          '인터넷이 연결되어 있지 않습니다.\n앱을 종료합니다.',
          [
            {
              text: '확인',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  exitApp.exitApp(); //Exit
                } else {
                  BackHandler.exitApp(); //Exit
                }
              },
            },
          ],
          { cancelable: false },
        );
    });
  };

	render() {
		return (
			<View style={styles.container}>
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
		);
	}
}

const styles = StyleSheet.create({
	container: {
	  ...StyleSheet.absoluteFillObject,
	  height: 400,
	  width: 400,
	  justifyContent: 'flex-end',
	  alignItems: 'center',
	},
	map: {
	  ...StyleSheet.absoluteFillObject,
	},
   });

export default App;
