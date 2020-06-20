import NetInfo from '@react-native-community/netinfo';
import { observer, Provider } from 'mobx-react';
import React from 'react';
import {
  Alert,
  BackHandler,
  NativeModules,
  Platform,
  YellowBox,
} from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationContainerComponent,
} from 'react-navigation';

import stores from './src/store';
import LoadingScreen from './src/screens/LoadingScreen';

export const { exitApp } = NativeModules;

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

let currentIndex: number = 0;

@observer
class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  navigation = React.createRef<NavigationContainerComponent>();

  componentDidMount = async () => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    } else {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }

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
      <Provider {...stores}>
        <AppContainer
          ref={this.navigation}
          onNavigationStateChange={(_prev, next) => {
            currentIndex = next.index;
          }}
        />
      </Provider>
    );
  }
}

const MainSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

const AppContainer = createAppContainer(MainSwitch);

export default App;
