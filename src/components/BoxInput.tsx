import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

interface BoxInputProps {
  label: string;
  placeholder: string;
  onChangeAction: (text: string) => void;
  value: string;
}

const BoxInput: React.FC<BoxInputProps> = ({
  label,
  placeholder,
  onChangeAction,
  value,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeAction(text)}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    paddingVertical: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapper: {
    marginVertical: 10,
  },
});

export default BoxInput;
