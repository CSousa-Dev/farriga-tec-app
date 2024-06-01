import { View, StyleSheet } from "react-native";
import AirHumidity from "../../../SensorMiniCard/AirHumidity";
import SoilMoisture from "../../../SensorMiniCard/SoilMoisture";
import Temperature from "../../../SensorMiniCard/Temperature";
import Rain from "../../../SensorMiniCard/Rain";

interface FarrigaOneMiniSensorsWrapperProps {
    airHumidityValue: number;
    soilMoistureValue: number;
    temperatureValue: number;
    isRain: boolean; 
}

export default function FarrigaOneMiniSensorsWrapper(props: FarrigaOneMiniSensorsWrapperProps) {
    return (
        <View style={styles.wrapper}>
            <AirHumidity    value={props.airHumidityValue}/>
            <SoilMoisture   value={props.soilMoistureValue}/>
            <Temperature    value={props.temperatureValue}/>
            <Rain           isRain={props.isRain}/>
        </View>
    )   
}


const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        gap: 10,
        marginBottom: 16,
        paddingHorizontal: 16,
    }
});

