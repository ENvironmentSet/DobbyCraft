import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from '../../components/Button';
import { NavigationScreenProp } from 'react-navigation';

interface SignUpFinProps {
  navigation: NavigationScreenProp<{}>;
}

const SignUpFin: React.FC<SignUpFinProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: '900' }}>Hello,</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 10 }}>
          @gwonHeeJun
        </Text>
      </View>
      <Button
        buttonLabel="SIGN IN NOW"
        onClickButton={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default SignUpFin;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
  },
});
