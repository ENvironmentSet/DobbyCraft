import { createStackNavigator } from 'react-navigation';
import Choose from './Choose';
import SignUpInfo from './SignUpInfo';
import SignUpHome from './SignUpHome';
import SignUpFin from './SignUpFin';
import Login from './Login';

const LoginStack = createStackNavigator(
  {
    Choose: Choose,
    SignUpInfo: SignUpInfo,
    SignUpHome: SignUpHome,
    SignUpFin: SignUpFin,
    Login: Login,
  },
  {
    headerMode: 'none',
  },
);

export default LoginStack;
