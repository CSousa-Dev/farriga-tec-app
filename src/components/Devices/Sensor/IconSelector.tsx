import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";
import React from 'react';

export default function IconSelector({sensorModel}:{sensorModel: string}) {
    const selectIcon = (sensorModel: string) => {
        switch(sensorModel) {
            case 'SENSOR-AIR-HUM-001':
                return <MaterialCommunityIcons name="weather-windy" size={26} color="#25572d" />;
            case 'SENSOR-SOIL-HUM-001':
                return <FontAwesome6 name="arrow-up-from-ground-water"  size={24} color="#25572d"/>
            case 'SENSOR-TEMP-001':
                return <FontAwesome6 name="temperature-half" size={24} color="#25572d"/>
            case 'SENSOR-RAIN-001':
                return <Ionicons name="rainy" size={24} color="#25572d" />
            default:
                return <Text>--</Text>;
        }
    }

    return (
        <>{selectIcon(sensorModel)}</>
    )

}