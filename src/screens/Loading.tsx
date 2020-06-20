import * as React from 'react';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import LoadingComponents from '../components/Loading';

interface LoadingScreenProps {
  navigation: NavigationScreenProp<{}>;
}

class Loading extends React.Component<LoadingScreenProps> {
  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => navigation.navigate('Login'), 1000);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponents />
      </SafeAreaView>
    );
  }
}

export default Loading;
