import React, { useState } from "react";
import { Pressable, TouchableHighlight } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { MaterialIcons } from '@expo/vector-icons';


interface CollapseButtonProps {
    onPress: () => void;
    colapse: boolean;
}

export default function CollapseButton({onPress, colapse}: CollapseButtonProps) {
    const rotation = useSharedValue(0);

    const toggleArrowDirection = () => {
        onPress();
        rotation.value = withTiming(colapse ? 0 : 180, {
        duration: 500,
      });
    };
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      };
    });
    

    return (
        <Pressable onPressIn={() => toggleArrowDirection()} onPress={() => console.log('Expandir')} style={{width: '100%', backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 4, marginBottom: 8}}>
                <Animated.View style={animatedStyle}>
                    <MaterialIcons name="expand-more" size={32} color="#ffffff" style={{backgroundColor: "#063511", elevation: 25, borderRadius: 100}}/>
                </Animated.View>
        </Pressable>
    );
}