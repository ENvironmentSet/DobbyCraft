import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image';

const BackIcn = require('../assets/back.png');

interface HealthDetailProps {
  navigation: NavigationScreenProp<{}>;
}

const HealthDetailScreen: React.FC<HealthDetailProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginRight: 'auto',
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('HealthCheck')}>
          <FastImage source={BackIcn} style={{ width: 20, height: 35 }} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 10, width: '100%' }}>
        <Text style={{ marginRight: 'auto', fontSize: 30, fontWeight: 'bold' }}>
          {navigation.getParam('title')}
        </Text>
        <Text style={{ color: '#333', fontSize: 15, marginTop: 20 }}>
          {navigation.getParam('desc')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HealthDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
