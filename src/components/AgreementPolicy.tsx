import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
const BeforeIcon = require('../assets/before.png');
const AfterIcon = require('../assets/after.png');

interface AgreementPolicyProps {
  label: string;
  isActive: boolean;
  changeIsActive: (value: boolean) => void;
}

const AgreementPolicy: React.FC<AgreementPolicyProps> = ({
  label,
  isActive,
  changeIsActive,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => changeIsActive(!isActive)}>
        <View style={styles.checkBox}>
          {isActive ? (
            <FastImage source={AfterIcon} style={{ width: 24, height: 24 }} />
          ) : (
            <FastImage source={BeforeIcon} style={{ width: 24, height: 24 }} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default AgreementPolicy;

const styles = StyleSheet.create({
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    marginVertical: 20,
  },
});
