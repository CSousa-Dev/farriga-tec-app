import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import React from 'react';
import FadeIn from '../../Animation/FadeIn';
import IconSelector from './IconSelector';

interface SensorMiniCardProps {
    currentMeasure: string | undefined;
    sensorModel: string ;
    sensorName: string;
}

export default function SensorMiniCard({currentMeasure, sensorModel, sensorName}: SensorMiniCardProps) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <IconSelector sensorModel={sensorModel}/>
            <Text style={BaseStyle.sensorValue}>{currentMeasure ?? '--'}%</Text>
            <Text style={BaseStyle.sensorName}>{sensorName}</Text>
        </FadeIn>
    )    
}

