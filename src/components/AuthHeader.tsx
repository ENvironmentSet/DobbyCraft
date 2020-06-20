import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface AuthHeaderProps {
  headerText: string;
  descText?: string;
  isShowSkip?: boolean;
  onClickSkipButton?: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  isShowSkip,
  headerText,
  descText,
}) => {
  return (
    <View style={styles.wrapper}>
      {isShowSkip && (
        <TouchableOpacity style={styles.rightTopButton}>
          <Text>Skip now</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{headerText}</Text>
      <Text
        style={[
          styles.descText,
          isShowSkip ? { marginBottom: 'auto' } : { marginBottom: 0 },
        ]}>
        {descText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    color: '#333',
    fontSize: 26,
    fontWeight: 'bold',
  },
  descText: {
    color: '#333',
    fontSize: 11,
  },
  rightTopButton: {
    marginTop: 15,
    marginLeft: 'auto',
    marginBottom: 'auto',
    color: '#333',
    fontSize: 12,
  },
});

export default AuthHeader;