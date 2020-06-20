import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ViewStyle, Alert } from 'react-native';
import Button from '../../components/Button';
import AuthHeader from '../../components/AuthHeader';
import LabelledInput from '../../components/LabelledInput';
import AgreementPolicy from '../../components/AgreementPolicy';
import { NavigationScreenProp } from 'react-navigation';

interface SignUpInfoProps {
  navigation: NavigationScreenProp<{}>;
}

const SignUpInfo: React.FC<SignUpInfoProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader headerText="Nice to meet you :-)" />
        <View style={{ flex: 3 }}>
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
            secure
          />
          <LabelledInput
            label="confirm password"
            placeholder="confirm password"
            value={confirmedPassword}
            onInput={setConfirmedPassword}
            secure
          />
          <AgreementPolicy
            isActive={isActive}
            onActivationChange={setIsActive}
            label="I agree to the Service Agreement"
          />
        </View>
      </View>
      <Button
        buttonLabel="NEXT"
        onClickButton={() => {
          const testUserName = /[A-Za-z]\w{5,11}/;
          const testPassword = /[A-Za-z]\w{7,19}/;

          if (
            testUserName.test(userName) &&
            testPassword.test(password) &&
            testPassword.test(confirmedPassword) &&
            password === confirmedPassword &&
            isActive
          ) {
            navigation.navigate('SignUpHome');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  wrapper: {
    flex: 1,
    width: '100%',
  },
});

export default SignUpInfo;
