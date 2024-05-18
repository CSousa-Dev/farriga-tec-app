import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import FadeIn from '../FadeIn';

export default function SoilMoisture({value}: {value: number}) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <FontAwesome6 name="arrow-up-from-ground-water"  size={24} color="#25572d"/>
            <Text style={BaseStyle.sensorValue}>{value}%</Text>
            <Text style={BaseStyle.sensorName}>Umidade do solo</Text>
        </FadeIn>
    )    
}

