import * as React from 'react';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import Loading from '../components/Loading';

interface LoadingScreenProps {
  navigation: NavigationScreenProp<{}>;
}

class LoadingScreen extends React.Component<LoadingScreenProps> {
  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => navigation.navigate('Login'), 500);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </SafeAreaView>
    );
  }
}

export default LoadingScreen;
