import { Text } from "react-native";
import React from 'react';
import FadeIn from '../../Animation/FadeIn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BaseStyle } from "../Sensor/BaseStyle";
interface SensorMiniCardProps {
    currentActivity?: string | undefined;
    alias: string ;
    position: number;
}

export default function IrrigatorMiniCard({alias, currentActivity, position}: SensorMiniCardProps) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <MaterialCommunityIcons name="watering-can" size={24} color="#25572d" />            
            <Text style={BaseStyle.sensorValue}>{currentActivity}</Text>
            <Text style={BaseStyle.sensorName}>{alias || 'Irrigador ' + position}</Text>
        </FadeIn>
    )    
}

