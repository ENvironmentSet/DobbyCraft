import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableWithoutFeedback } from 'react-native';

interface MenuItemProps {
  obj: {
    screen: string;
    title: string;
    imoge: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ obj }) => {
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <View style={styles.TextWrapper}>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>
            {obj.title}
          </Text>
        </View>
        <View style={styles.IconWrapper}>
          <Text style={{ fontSize: 36 }}>{obj.imoge}</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 125,
    paddingVertical: 8,
    paddingHorizontal: 17,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 15,
    marginHorizontal: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  TextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  IconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
});
