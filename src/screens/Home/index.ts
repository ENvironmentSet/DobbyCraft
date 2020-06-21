import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import HealthCheck from './HealthCheck';
import HealthDetail from './HealthDetail';
import Guideline from './GuidelineScreen';
import ImSafe from './ImSafeScreen';
import SafeBuilding from './SafeBuildingScreen';

const HomeStack = createStackNavigator(
  {
    Home,
    HealthCheck,
    HealthDetail,
    Guideline: Guideline,
    ImSafe,
    SafeBuilding,
  },
  {
    headerMode: 'none',
  },
);

export default HomeStack;
