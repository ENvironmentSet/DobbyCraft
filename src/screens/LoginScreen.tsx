import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import LablledInput from '../components/LablledInput';
import AuthHeader from '../components/AuthHeader';
import { NavigationScreenProp } from 'react-navigation';

interface LoginProps {
  navigation: NavigationScreenProp<{}>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader headerText="Welcome back :-)" />
        <View style={{ flex: 3, width: '100%' }}>
          <LablledInput
            label="username"
            placeholder="6 ~ 12 characters"
            value={userName}
            onInput={setUserName}
          />
          <LablledInput
            label="password"
            placeholder="8 ~ 20 characters"
            value={password}
            onInput={setPassword}
          />
        </View>
      </View>
      <Button buttonLabel="SIGN IN" onClickButton={() => console.log('ads')} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
});
