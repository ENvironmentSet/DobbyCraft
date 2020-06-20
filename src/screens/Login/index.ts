import { createStackNavigator } from 'react-navigation';
import Choose from './Choose';
import SignUpInfo from './SignUpInfo';
import SignUpHome from './SignUpHome';
import SignUpFin from './SignUpFin';
import Login from './Login';

const LoginStack = createStackNavigator(
  {
    Choose,
    SignUpInfo,
    SignUpHome,
    SignUpFin,
    Login,
  },
  {
    headerMode: 'none',
  },
);

export default LoginStack;
