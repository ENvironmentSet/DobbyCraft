import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import HealthCheck from './HealthCheck';
import HealthDetail from './HealthDetail';

const HomeStack = createStackNavigator(
  {
    Home: Home,
    HealthCheck: HealthCheck,
    HealthDetail: HealthDetail,
  },
  {
    headerMode: 'none',
  },
);

export default HomeStack;
