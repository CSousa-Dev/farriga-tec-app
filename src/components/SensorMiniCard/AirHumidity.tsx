import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import FadeIn from '../FadeIn';

export default function AirHumidity({value}: {value: number}) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <MaterialCommunityIcons name="weather-windy" size={26} color="#25572d" />
            <Text style={BaseStyle.sensorValue}>{value}%</Text>
            <Text style={BaseStyle.sensorName}>Umidade do ar</Text>
        </FadeIn>
    )    
}

