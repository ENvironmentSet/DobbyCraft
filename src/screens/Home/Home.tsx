import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ViewStyle,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import MenuItem from '../../components/MenuItem';
import SnsLastFeed from '../../components/SnsLastFeed';
//@ts-ignore
import { SliderBox } from 'react-native-image-slider-box';
import { NavigationScreenProp } from 'react-navigation';
import moment from 'moment';
import { runStayTimer, stopStayTimer } from '../StayedTime';
import { useUserData } from '../../User';

const BottomData = [
  {
    title: 'Guidelines',
    screen: 'Guideline',
    imoge: '📋',
  },
  {
    title: "I'm Safe!",
    screen: 'ImSafe',
    imoge: '🙆‍♀️',
  },
  {
    title: 'Safe\nBuildings',
    screen: 'SafeBuilding',
    imoge: '🏢',
  },
  {
    title: 'Health\nCheck',
    screen: 'HealthCheck',
    imoge: '👨‍⚕️',
  },
];

const Images = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
  'https://source.unsplash.com/1024x768/?tree',
];

interface HomeProps {
  navigation: NavigationScreenProp<{}>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { home } = useUserData();

  useEffect(() => {
    if (home !== undefined) {
      const { latitude, longitude } = home;

      runStayTimer({
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      return stopStayTimer;
    }
  }, [home]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDivision}>
        <Text style={styles.Date}>{moment().format('dddd DD MMMM')}</Text>
        <Text style={styles.header}>Stay Safe!</Text>
        <Text style={styles.desc}>Latest News</Text>
        <SnsLastFeed />
        <View style={{ position: 'absolute', top: 250, left: -30 }}>
          <SliderBox images={Images} />
        </View>
      </View>
      <View style={styles.bottomDivision}>
        <FlatList
          data={BottomData}
          renderItem={({ item }) => {
            return (
              <MenuItem
                obj={item}
                key="item-new"
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          }}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  bottomDivision: {
    flex: 2,
    width: '100%',
    alignItems: 'stretch',
  },
  topDivision: {
    flex: 3,
    width: '100%',
    height: '100%',
  },
  Date: {
    marginTop: 20,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.394871)',
    fontWeight: 'bold',
  },
  header: {
    marginTop: 7,
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
});
