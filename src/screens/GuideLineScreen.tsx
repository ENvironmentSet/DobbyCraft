import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import Button from '../components/Button';

const CloseIcn = require('../assets/x.png');

interface HealthCheckProps {
    navigation: NavigationScreenProp<{}>;
}

const GuideLineScreen: React.FC<HealthCheckProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: 'auto',
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <FastImage source={CloseIcn} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 10, width: '100%' }}>
        
      </View>
      <Button buttonLabel="NEXT" onClickButton={() => console.log("a")}/>
    </SafeAreaView>
  );
};

export default GuideLineScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 50,
      marginHorizontal: 30,
    },
  });
  