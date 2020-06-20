import * as React from 'react';
import { Animated, Easing, View } from 'react-native';

import palette from '../constants/palette';

class Loading extends React.Component<{}> {
  AnimationLeft = new Animated.Value(1);
  AnimationCenter = new Animated.Value(1);
  AnimationRight = new Animated.Value(1);

  sequence = Animated.parallel([
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.AnimationLeft, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(this.AnimationLeft, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    ),
    Animated.sequence([
      Animated.delay(180),
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.AnimationCenter, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(this.AnimationCenter, {
            toValue: 1,
            duration: 500,
            easing: Easing.in(Easing.quad),
            useNativeDriver: false,
          }),
        ]),
      ),
    ]),
    Animated.sequence([
      Animated.delay(360),
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.AnimationRight, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(this.AnimationRight, {
            toValue: 1,
            duration: 500,
            easing: Easing.in(Easing.quad),
            useNativeDriver: false,
          }),
        ]),
      ),
    ]),
  ]);

  AnimatedLeft: Animated.AnimatedInterpolation = this.AnimationLeft.interpolate(
    {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    },
  );
  AnimatedCenter: Animated.AnimatedInterpolation = this.AnimationCenter.interpolate(
    {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    },
  );
  AnimatedRight: Animated.AnimatedInterpolation = this.AnimationRight.interpolate(
    {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    },
  );

  componentDidMount() {
    this.sequence.start();
  }

  componentWillUnmount() {
    this.sequence.stop();
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', width: 50 }}>
        <Animated.View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: palette.COLOR_BLUEBERRY,
            opacity: 1,
            transform: [{ scale: this.AnimatedLeft }],
          }}
        />
        <Animated.View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: palette.COLOR_BLUEBERRY,
            opacity: 0.7,
            transform: [{ scale: this.AnimatedCenter }],
            marginLeft: 10,
          }}
        />
        <Animated.View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: palette.COLOR_BLUEBERRY,
            opacity: 0.5,
            transform: [{ scale: this.AnimatedRight }],
            marginLeft: 10,
          }}
        />
      </View>
    );
  }
}

export default Loading;
