//@ts-ignore-next-line
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';

let countedTime = 0;
let isOn = false;

//From: https://www.geodatasource.com/developers/javascript
function distance(
  {
    latitude: lat1,
    longitude: lon1,
  }: {
    latitude: number;
    longitude: number;
  },
  {
    latitude: lat2,
    longitude: lon2,
  }: {
    latitude: number;
    longitude: number;
  },
) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  }
}

function isNearby(
  base: {
    latitude: number;
    longitude: number;
  },
  place: {
    latitude: number;
    longitude: number;
  },
): boolean {
  const dist = distance(base, place);

  return dist < 0.125;
}

export function stopStayTimer() {
  BackgroundTimer.stopBackgroundTimer();
}

export function runStayTimer(userHome: {
  latitude: number;
  longitude: number;
}) {
  if (!isOn) {
    countedTime = 0;
    BackgroundTimer.runBackgroundTimer(async () => {
      Geolocation.getCurrentPosition(async ({ coords }) => {
        if (isNearby(userHome, coords)) {
          countedTime += 1;
        } else {
          Alert.alert(
            'Notice',
            "You just exited your home, right? we've just stop counting time you staying at home. To restart counter, please press confirm.",
            [
              {
                text: 'Confirm',
                onPress: () => runStayTimer(userHome),
              },
              {
                text: 'No',
              },
            ],
          );
          stopStayTimer();
        }
      });
    }, 60000);
  }
}

export function getCountedTime() {
  return countedTime;
}
