import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";
import { BaseStyle } from './BaseStyle';
import FadeIn from '../Animation/FadeIn';

export default function Rain({isRain}: {isRain: boolean}) {
    return (
        <FadeIn style={BaseStyle.wrapper}>
            <Ionicons name="rainy" size={24} color="#25572d" />
            <Text style={BaseStyle.sensorValue}>{isRain? 'Sim' : 'Não' }</Text>
            <Text style={BaseStyle.sensorName}>Chuva</Text>
        </FadeIn>
    )    
}

