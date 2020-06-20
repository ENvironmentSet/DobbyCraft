import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface ButtonProps {
  buttonLabel: string;
  onClickButton: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, onClickButton }) => {
  return (
    <TouchableWithoutFeedback onPress={onClickButton}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{buttonLabel}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#007AFF',
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
