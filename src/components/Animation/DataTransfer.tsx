import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const DataTransfer = () => {
  const translation = useSharedValue(0);

  useEffect(() => {
    translation.value = withTiming(300, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [translation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.startPoint} />
      <Animated.View style={[styles.data, animatedStyle]} />
      <View style={styles.endPoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 100,
  },
  startPoint: {
    width: 30,
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 15,
  },
  endPoint: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    borderRadius: 15,
  },
  data: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

export default DataTransfer;