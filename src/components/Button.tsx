import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface ButtonProps {
  buttonLabel: string;
  onClickButton: () => void;
  isGray?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, onClickButton, isGray }) => {
  return (
    <TouchableWithoutFeedback onPress={onClickButton}>
      <View style={[styles.wrapper, isGray ? { backgroundColor : '#ACACAC' } : { backgroundColor: '#007AFF' }]}>
        <Text style={styles.text}>{buttonLabel}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default Button;
