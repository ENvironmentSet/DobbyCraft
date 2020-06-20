import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Alert,
  BackHandler,
  NativeModules,
  Platform,
  StyleSheet,
  View,
  YellowBox,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { NavigationContainerComponent } from 'react-navigation';

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
      !state.isConnected &&
        Alert.alert(
          '알림',
          '인터넷이 연결되어 있지 않습니다.\n앱을 종료합니다.',
          [
            {
              text: '확인',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  exitApp.exitApp();
                } else {
                  BackHandler.exitApp();
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
          provider={PROVIDER_GOOGLE}
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
