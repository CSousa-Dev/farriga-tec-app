import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  style?: object;
}

export default function FadeIn(props: FadeInViewProps) {
  const opacity = useSharedValue(0); // Valor inicial de opacidade: 0

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 750, 
      easing: Easing.inOut(Easing.ease),
    });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View // View animada
      style={[props.style, animatedStyle]}
    >
      {props.children}
    </Animated.View>
  );
};
