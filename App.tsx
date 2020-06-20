import NetInfo from '@react-native-community/netinfo';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
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

import stores from './src/store';
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
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(MainSwitch);

@observer
class App extends React.Component {
  currentIndex = 0;
  navigation = React.createRef<NavigationContainerComponent>();

  async componentDidMount() {
    for (const requiredPermission of requiredPermissions[Platform.OS]) {
      await request(requiredPermission);
    }

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

  render() {
    return (
      <Provider {...stores}>
        <AppContainer
          ref={this.navigation}
          onNavigationStateChange={(_, { index: nextIndex }) => {
            this.currentIndex = nextIndex;
          }}
        />
      </Provider>
    );
  }
}

export default App;
