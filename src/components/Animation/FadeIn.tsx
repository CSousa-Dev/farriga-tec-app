import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  style?: object;
  duration?: number;
}

export default function FadeIn(props: FadeInViewProps) {
  const opacity = useSharedValue(0); // Valor inicial de opacidade: 0

  useEffect(() => {
    let duration = props.duration || 750;
    opacity.value = withTiming(1, {
      duration: duration, // Duração da animação: 750ms
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
