import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import React from 'react';
import FadeIn from '../../Animation/FadeIn';
import IconSelector from './IconSelector';

interface SensorMiniCardProps {
    currentMeasure: boolean | number | undefined;
    sensorModel: string ;
    sensorName: string;
    measureUnit?: string;
}

export default function SensorMiniCard({currentMeasure, sensorModel, sensorName, measureUnit}: SensorMiniCardProps) {
    const formattedMeasure = () => {
        if(currentMeasure === undefined){
            return '--';
        }

        if(currentMeasure === true || currentMeasure === false){
            return currentMeasure ? 'Sim' : 'Não';
        }

        return currentMeasure;
    }
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <IconSelector sensorModel={sensorModel}/>
            <Text style={BaseStyle.sensorValue}>{formattedMeasure() + (measureUnit ?? '')}</Text>
            <Text style={BaseStyle.sensorName}>{sensorName}</Text>
        </FadeIn>
    )    
}

