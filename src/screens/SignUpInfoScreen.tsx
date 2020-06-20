import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from '../components/Button';
import AuthHeader from '../components/AuthHeader';
import BoxInput from '../components/LablledInput';
import AgreementPolicy from '../components/AgreementPolicy';

const SignUpInfoScreen: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [isActive, setIsActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AuthHeader headerText="Nice to meet you :-)" />
        <View style={{ flex: 3 }}>
          <BoxInput
            label="username"
            placeholder="6 ~ 12 characters"
            value={userName}
            onInput={setUserName}
          />
          <BoxInput
            label="password"
            placeholder="8 ~ 20 characters"
            value={userName}
            onInput={setUserName}
          />
          <BoxInput
            label="confirm password"
            placeholder="confirm password"
            value={userName}
            onInput={setUserName}
          />
          <AgreementPolicy
            isActive={isActive}
            onActivationChange={setIsActive}
            label="I agree to the Service Agreement"
          />
        </View>
      </View>
      <Button buttonLabel="NEXT" onClickButton={() => console.log('ass')} />
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

export default SignUpInfoScreen;
