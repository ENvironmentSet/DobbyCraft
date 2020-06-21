import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
const BeforeIcon = require('../assets/before.png');
const AfterIcon = require('../assets/after.png');

interface AgreementPolicyProps {
  label: string;
  isActive: boolean;
  onActivationChange: (value: boolean) => void;
}

const AgreementPolicy: React.FC<AgreementPolicyProps> = ({
  label,
  isActive,
  onActivationChange,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onActivationChange(!isActive)}>
      <View style={styles.wrapper}>
        <View style={styles.checkBox}>
          <FastImage
            source={isActive ? AfterIcon : BeforeIcon}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
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
