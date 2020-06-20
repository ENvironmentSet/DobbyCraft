import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import QuestionItem from '../../components/QuestionItem';
import { NavigationScreenProp } from 'react-navigation';

const CloseIcn = require('../../assets/x.png');

const Data = [
  {
    title: 'QuestionQuestionQuestion ?',
    desc: 'desc',
  },
  {
    title: 'title',
    desc: 'desc',
  },
  {
    title: 'title',
    desc: 'desc',
  },
];

interface HealthCheckProps {
  navigation: NavigationScreenProp<{}>;
}

const HealthCheck: React.FC<HealthCheckProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: 'auto',
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <FastImage source={CloseIcn} style={{ width: 25, height: 25 }} />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 10, width: '100%' }}>
        <Text style={{ marginRight: 'auto', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
          Health Check
        </Text>
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return (
              <QuestionItem
                obj={item}
                key="question-new"
                onPress={() =>
                  navigation.navigate('HealthDetail', {
                    title: item.title,
                    desc: item.desc,
                  })
                }
              />
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HealthCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
  },
});
