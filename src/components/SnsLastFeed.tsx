import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useUserData } from '../User';

interface SnsLast {
  feed: {
    author: string;
    title: string;
    link: string;
    linkText: string;
  };
}

const SnsLastFeed: React.FC<SnsLast> = ({
  feed: { author, title, link, linkText },
}) => {
  const { name } = useUserData();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 25, marginLeft: 10 }}>🚨</Text>
        </View>
        <Text style={{ marginLeft: 17, fontWeight: 'bold' }}>{author}</Text>
        <TouchableWithoutFeedback onPress={() => Linking.openURL(link)}>
          <Text
            style={{ marginLeft: 10, fontWeight: 'bold', color: '#007AFF' }}>
            {linkText}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

export default SnsLastFeed;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
