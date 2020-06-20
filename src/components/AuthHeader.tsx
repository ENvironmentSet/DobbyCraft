import React from 'react';
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
  onClickSkipButton
}) => {
  return (
    <View style={styles.wrapper}>
      {isShowSkip && (
        <TouchableOpacity style={styles.rightTopButton} onPress={onClickSkipButton}>
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
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16
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
