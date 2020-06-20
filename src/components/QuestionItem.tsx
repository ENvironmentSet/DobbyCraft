import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

interface QuestionProps {
  obj: {
    title: string;
    desc: string;
  };
  onPress: () => void;
}

const QuestionItem: React.FC<QuestionProps> = ({ obj, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 25 }}>
            {obj.title.length > 18
              ? obj.title.slice(0, 18) + '...'
              : obj.title.slice(0, 18)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: 20,
            marginTop: 5,
          }}>
          <Text style={{ color: '#333', fontSize: 15 }}>
            {obj.desc.length > 30
              ? obj.desc.slice(0, 30) + '...'
              : obj.desc.slice(0, 30)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginRight: 20,
          }}>
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>
            Learn More
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 150,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    borderRadius: 12,
  },
});
