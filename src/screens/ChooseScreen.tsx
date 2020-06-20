import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface ChooseProps {
  navigation: NavigationScreenProp<{}>;
}

const ChooseScreen: React.FC<ChooseProps> = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.topButton}>
            <Text style={{ color: '#333', fontSize: 14 }}>Sign In</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SignUpInfo')}>
          <View style={styles.bottomButton}>
            <Text style={{ color: '#fff', fontSize: 14 }}>Join now !</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default ChooseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  topButton: {
    backgroundColor: '#fff',
    borderRadius: 3,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
