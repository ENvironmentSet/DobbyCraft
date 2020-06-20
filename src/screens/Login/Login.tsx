import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import Button from '../../components/Button';
import LabelledInput from '../../components/LabelledInput';
import AuthHeader from '../../components/AuthHeader';
import { NavigationScreenProp } from 'react-navigation';
import { useUserDataUpdater } from '../../User';
import request from '../../utils/request';

interface LoginProps {
  navigation: NavigationScreenProp<{}>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const setUserData = useUserDataUpdater();
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
        onClickButton={async () => {
          const testUserName = /[A-Za-z]\w{5,11}/;
          const testPassword = /[A-Za-z]\w{7,19}/;

          if (testUserName.test(userName) && testPassword.test(password)) {
            const {
              accessToken,
              refreshToken,
              extraInformation: { latitude, longitude, address },
            } = await request<{
              accessToken: string;
              refreshToken: string;
              extraInformation: {
                latitude: string;
                longitude: string;
                address: string;
              };
            }>('auth', {
              method: 'POST',
              body: `username=${userName}&password=${password}`,
            });

            setUserData({
              name: userName,
              home: {
                latitude: latitude,
                longitude,
                address,
              },
              token: {
                accessToken,
                refreshToken,
              },
            });

            navigation.navigate('Home');
            return;
          }
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
