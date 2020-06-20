import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import Button from '../../components/Button';
import LabelledInput from '../../components/LabelledInput';
import AuthHeader from '../../components/AuthHeader';
import { NavigationScreenProp } from 'react-navigation';

interface LoginProps {
  navigation: NavigationScreenProp<{}>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader headerText="Welcome back :-)" />
        <View style={{ flex: 3, width: '100%' }}>
          <LabelledInput
            label="username"
            placeholder="6 ~ 12 characters"
            value={userName}
            onInput={setUserName}
          />
          <LabelledInput
            label="password"
            placeholder="8 ~ 20 characters"
            value={password}
            onInput={setPassword}
            secure={true}
          />
        </View>
      </View>
      <Button
        buttonLabel="SIGN IN"
        onClickButton={() => {
          const testUserName = /[A-Za-z]\w{5,11}/;
          const testPassword = /[A-Za-z]\w{7,19}/;

          if (testUserName.test(userName) && testPassword.test(password)) {
            Alert.alert(
              '알림',
              '네모바지 스폰지송~!~!~!🤪',
              [
                {
                  text: '확인',
                },
              ],
              { cancelable: false },
            );
          } else {
            Alert.alert(
              '알림',
              '네모바지 스폰지밥~!~!~!🤪',
              [
                {
                  text: '확인',
                },
              ],
              { cancelable: false },
            );
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Login;

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
