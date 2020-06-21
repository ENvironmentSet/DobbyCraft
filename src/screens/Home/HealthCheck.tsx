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
    title: 'Can mosquitoes or ticks spread the virus that causes COVID-19?',
    desc:
      'At this time, CDC has no data to suggest that this new coronavirus or other similar coronaviruses are spread by mosquitoes or ticks. The main way that COVID-19 spreads is from person to person. See How Coronavirus Spreads for more information.',
  },
  {
    title: 'Is it true that this novel coronavirus originated from bats?',
    desc:
      'This is one possibility but the origin of the virus has not yet been established.',
  },
  {
    title: 'Is it okay for me to donate blood?',
    desc:
      'In healthcare settings across the United States, donated blood is a lifesaving, essential part of caring for patients. The need for donated blood is constant, and blood centers are open and in urgent need of donations. CDC encourages people who are well to continue to donate blood if they are able, even if they are practicing social distancing because of COVID-19. CDC is supporting blood centers by providing recommendations that will keep donors and staff safe. Examples of these recommendations include spacing donor chairs 6 feet apart, thoroughly adhering to environmental cleaning practices, and encouraging donors to make donation appointments ahead of time.',
  },
  {
    title: 'If I have recovered from COVOID-19, will I be immune to it?',
    desc:
      'We do not know yet if people who recover from COVID-19 can get infected again. CDC and partners are investigating to determine if a person can get sick with COVID-19 more than once. Until we know more, continue to take steps to protect yourself and others.',
  },
  {
    title: 'Am I at rick for COVOID-19 from mail, packages, or products?',
    desc:
      'There is still a lot that is unknown about COVID-19 and how it spreads. Coronaviruses are thought to be spread most often by respiratory droplets. Although the virus can survive for a short period on some surfaces, it is unlikely to be spread from domestic or international mail, products or packaging. However, it may be possible that people can get COVID-19 by touching a surface or object that has the virus on it and then touching their own mouth, nose, or possibly their eyes, but this is not thought to be the main way the virus spreads. Learn more about safe handling of deliveries and mail.',
  },
  {
    title:
      'What should I do if I have had close contact with someone who has COVOID-19?',
    desc: `-Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19. -Take your temperature and follow CDC guidance if you have symptoms.`,
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
        <Text
          style={{
            marginRight: 'auto',
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
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
