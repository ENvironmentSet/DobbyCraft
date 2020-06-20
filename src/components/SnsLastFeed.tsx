import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SnsLastFeed: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 30, height: 30, backgroundColor: '#000' }} />
        <Text style={{ marginLeft: 17, fontWeight: 'bold' }}>userIdFeed</Text>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://m.naver.com')}>
          <Text
            style={{ marginLeft: 10, fontWeight: 'bold', color: '#007AFF' }}>
            @ snsService, time ago
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          mollitia itaque saepe nihil dignissimos architecto praesentium dolores
          iure. Mollitia corrupti,
        </Text>
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
