import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import FadeIn from '../Animation/FadeIn';

export default function Temperature({value}: {value: number}) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <FontAwesome6 name="temperature-half" size={24} color="#25572d"/>
            <Text style={BaseStyle.sensorValue}>{value}°C</Text>
            <Text style={BaseStyle.sensorName}>Temperatura</Text>
        </FadeIn>
    )    
}

