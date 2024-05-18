import { View } from "react-native";
import SensorCard from "../../../SensorCard/SensorCard"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Slide from "../../../Slide";

interface FarrigaOneSensorWrapperProps {
    airUmidity: {
        value: number;
        status: string;
        lastUpdate: string;
        onChangePower: (on: boolean) => void;
        sensibility: {
            onChangeSensibility: (value: number) => void;
            label: string;
            value: number;
            min: number;
            max: number;
        };
    };        
    soilMoisture: {
        value: number;
        status: string;
        lastUpdate: string;
        on: boolean;
        onChangePower: (on: boolean) => void;
        sensibility: {
            onChangeSensibility: (value: number) => void;
            label: string;
            value: number;
            min: number;
            max: number;
        };
    };
    temperature: {
        on: boolean;
        value: number;
        status: string;
        lastUpdate: string;
        onChangePower: (on: boolean) => void;
        sensibility: {
            onChangeSensibility: (value: number) => void;
            label: string;
            value: number;
            min: number;
            max: number;
        };
    };
    rain: {
        on: boolean;
        isRain: boolean;
        status: string;
        lastUpdate: string;
        onChangePower: (on: boolean) => void;
    };
}

export default function FarrigaOneSensorsWrapper(props: FarrigaOneSensorWrapperProps)
{
    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <Slide style={{width: '100%', alignItems: 'center'}}>
                <SensorCard
                    title="Umidade do Ar"
                    lastUpdate={props.airUmidity.lastUpdate}
                    status={props.airUmidity.status}
                    value={props.airUmidity.value}
                    sulfix="%"
                    on={true}
                    onChangePower={() => props.airUmidity.onChangePower(true)}
                    icon={
                        <MaterialCommunityIcons name="weather-windy" size={26} color="#25572d"/>
                    }
                    sensibility={
                        props.airUmidity.sensibility
                    }
                />
            </Slide>
            <Slide style={{width: '100%', alignItems: 'center'}} delayDuration={100}>
                <SensorCard
                    title="Umidade do Solo"
                    lastUpdate={props.soilMoisture.lastUpdate}
                    status={props.soilMoisture.status}
                    value={props.soilMoisture.value}
                    sulfix="%"
                    on={props.soilMoisture.on}
                    onChangePower={() => props.soilMoisture.onChangePower(true)}
                    icon={
                        <FontAwesome6 name="arrow-up-from-ground-water"  size={24} color="#25572d"/>
                    }
                    sensibility={{
                        label: props.soilMoisture.sensibility.label,
                        onChangeSensibility: props.soilMoisture.sensibility.onChangeSensibility,
                        value: props.soilMoisture.sensibility.value,
                        min: 20,
                        max: 70
                    }}
                />
            </Slide>
            <Slide style={{width: '100%', alignItems: 'center'}} delayDuration={200}>
                <SensorCard
                    title="Temperatura"
                    lastUpdate={props.temperature.lastUpdate}
                    status={props.temperature.status}
                    value={props.temperature.value}
                    sulfix="°C"
                    on={props.temperature.on}
                    onChangePower={() => props.temperature.onChangePower(true)}
                    icon={
                        <FontAwesome6 name="temperature-half" size={24} color="#25572d"/>
                    }
                    sensibility={
                        props.temperature.sensibility
                    }
                />
            </Slide>
            <Slide style={{width: '100%', alignItems: 'center'}} delayDuration={300}>
                <SensorCard
                    title="Chuva"
                    lastUpdate={props.rain.lastUpdate}
                    status={props.rain.status}
                    value={props.rain.isRain ? 'Chovendo' : 'Sem chuva'}
                    on={props.rain.on}
                    onChangePower={() => props.rain.onChangePower(true)}
                    icon={
                        <FontAwesome6 name="temperature-half" size={24} color="#25572d"/>
                    }
                />
            </Slide>
        </View>
    )
}