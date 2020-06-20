import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
import { Circle } from 'react-native-maps';

const CloseIcn = require('../../assets/x.png');

const GlobalData = [
  {
    text: "Don't touch your face",
    imoge: '🤦',
  },
  {
    text: "Don't sneeze into hands",
    imoge: '🤧',
  },
  {
    text: 'Do sneeze into your elbow',
    imoge: '💪',
  },
  {
    text: 'Wash your hands regularly',
    imoge: '🖐',
  },
  {
    text: 'Wearing a mask in public',
    imoge: '😷',
  },
];

interface HealthCheckProps {
  navigation: NavigationScreenProp<{}>;
}

const GuidelineScreen: React.FC<HealthCheckProps> = ({ navigation }) => {
  const [nowIndex, setNowIndex] = useState(0);

  const circleIndex = () =>
    GlobalData.map((itm, ix) => {
      return (
        <View
          style={{
            backgroundColor: nowIndex === ix ? '#000' : '#BDBDBD',
            width: 8,
            height: 8,
            borderRadius: 50,
            marginHorizontal: 10,
          }}
        />
      );
    });

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
      <View
        style={{
          flex: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {GlobalData.map((item, ix) => {
          if (ix === nowIndex) {
            return (
              <>
                <Text style={{ fontSize: 100, marginTop: 'auto' }} key={item.imoge}>
                  {item.imoge}
                </Text>
                <Text style={{ fontSize: 30, marginTop: 'auto' }} key={item.text}>
                  {item.text}
                </Text>
              </>
            );
          } else {
            return false;
          }
        })}
        <View
          style={{
            marginBottom: 'auto',
            marginTop: 'auto',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {circleIndex()}
        </View>
      </View>
      <Button
        buttonLabel={GlobalData.length === nowIndex + 1 ? 'FIN' : 'NEXT'}
        onClickButton={() =>
          GlobalData.length === nowIndex + 1
            ? navigation.navigate('Home')
            : setNowIndex(nowIndex + 1)
        }
      />
    </SafeAreaView>
  );
};

export default GuidelineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
  },
});
