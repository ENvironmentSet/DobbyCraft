import NetInfo from '@react-native-community/netinfo';
import React, { useRef, useState, useEffect } from 'react';
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
  createStackNavigator,
} from 'react-navigation';

import LoadingScreen from './src/screens/LoadingScreen';

import requiredPermissions from './src/constants/requiredPermissions';
import SignUpInfoScreen from './src/screens/SignUpInfoScreen';
import ChooseScreen from './src/screens/ChooseScreen';
import SignUpHomeScreen from './src/screens/SignUpHomeScreen';
import SignUpFinScreen from './src/screens/SignUpFinScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import HealthCheckScreen from './src/screens/HealthCheckScreen';
import HealthDetailScreen from './src/screens/HealthDetailScreen';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const LoginStack = createStackNavigator(
  {
    Choose: ChooseScreen,
    SignUpInfo: SignUpInfoScreen,
    SignUpHome: SignUpHomeScreen,
    SignUpFin: SignUpFinScreen,
    Login: LoginScreen,
  },
  {
    headerMode: 'none',
  },
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    HealthCheck: HealthCheckScreen,
    HealthDetail: HealthDetailScreen,
  },
  {
    headerMode: 'none',
  },
);

const MainSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginStack,
    Home: HomeStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

const AppContainer = createAppContainer(MainSwitch);

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigator = useRef<NavigationContainerComponent>(null);

  useEffect(() => {
    async function requestPermissions() {
      for (const requiredPermission of requiredPermissions[Platform.OS]) {
        await request(requiredPermission);
      }
    }

    async function checkNetworkConnection() {
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
    }

    requestPermissions();
    checkNetworkConnection();
  });

  return (
    <AppContainer
      ref={navigator}
      onNavigationStateChange={(_, { index: nextIndex }) =>
        setCurrentIndex(nextIndex)
      }
    />
  );
}

export default App;
