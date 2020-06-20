import NetInfo from '@react-native-community/netinfo';
import React, { useRef, useState } from 'react';
import useAsyncEffect from './src/utils/useAsyncEffect';
import { ProvideUserData } from './src/User';
import {
  Alert,
  BackHandler,
  NativeModules,
  Platform,
  YellowBox,
} from 'react-native';
import { request } from 'react-native-permissions';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationContainerComponent,
} from 'react-navigation';

import Loading from './src/screens/Loading';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

import requiredPermissions from './src/constants/requiredPermissions';

const MainSwitch = createSwitchNavigator(
  {
    Loading,
    Login,
    Home,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(MainSwitch);

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigator = useRef<NavigationContainerComponent>(null);

  useAsyncEffect(async function requestPermissions() {
    for (const requiredPermission of requiredPermissions[Platform.OS]) {
      await request(requiredPermission);
    }
  });

  useAsyncEffect(async function checkNetworkConnection() {
    const { isConnected } = await NetInfo.fetch();

    if (!isConnected) {
      Alert.alert(
        '알림',
        '인터넷이 연결되어 있지 않습니다.\n앱을 종료합니다.',
        [
          {
            text: '확인',
            onPress: () =>
              Platform.OS === 'ios'
                ? NativeModules.exitApp.exitApp()
                : BackHandler.exitApp(),
          },
        ],
        { cancelable: false },
      );
    }
  });

  return (
    <ProvideUserData>
      <AppContainer
        ref={navigator}
        onNavigationStateChange={(_, { index: nextIndex }) =>
          setCurrentIndex(nextIndex)
        }
      />
    </ProvideUserData>
  );
}

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

export default App;
