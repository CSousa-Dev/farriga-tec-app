import React, { useEffect } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface SlideInViewProps {
  children: React.ReactNode;
  style?: object;
  delayDuration?: number;
}

export default function Slide(props: SlideInViewProps) {
  const translateX = useSharedValue(-300); // Valor inicial fora da tela à esquerda

  useEffect(() => {

    if(props.delayDuration){
        setTimeout(() => {
            translateX.value = withTiming(0, {
                duration: 250, // Duração da animação: 1000ms
                easing: Easing.inOut(Easing.ease),
            });
        }, props.delayDuration)
    }  

    if(!props.delayDuration){
        translateX.value = withTiming(0, {
          duration: 250, // Duração da animação: 1000ms
          easing: Easing.inOut(Easing.ease),
        });
    }
    }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
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