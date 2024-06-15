import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import FarrigaOneHeader from "./FarrigaOneHeader";
import FarrigaOneMiniSensorsWrapper from "./FarrigaOneMiniSensorsWrapper";
import { useState } from "react";
import FarrigaOneSensorsWrapper from "./FarrigaOneSensorsWrapper";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React from "react";

interface ModelFarrigaOneProps {
    isConnect: boolean;
    connectionMessage: string;
    deviceName: string;
    status: string;
    lastIrrigation: string;
    sensorsMetrics: {
        airHumidity: {
            value: number;
            status: string;
            lastUpdate: string;
            sensibility: number;
        };
        soilMoisture: {
            value: number;
            status: string;
            lastUpdate: string;
            sensibility: number;
        };
        temperature: {
            value: number;
            status: string;
            lastUpdate: string;
            sensibility: number;
        };
        rain: {
            isRain: boolean;
            status: string;
            lastUpdate: string;
        };      
    } 
}

export default function ModelFarrigaOne() {

    const [colapse, setColapse] = useState(false);
    const rotation = useSharedValue(0);

    const toggleArrowDirection = () => {
        setColapse(!colapse);
        rotation.value = withTiming(colapse ? 0 : 180, {
        duration: 500, // Duração da animação: 500ms
      });
    };
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      };
    });

    let colors = ['#045f18', '#1d722b', '#228d34','#1d4926'];
    return (
        <LinearGradient colors={colors} style={styles.wrapper}>
            <FarrigaOneHeader deviceName="Farriga Tec 1" status="Ativo" lastIrrigation="23:10"/>
            <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:18, marginBottom: 16}}>Sensores: </Text>
            {!colapse && <FarrigaOneMiniSensorsWrapper
                airHumidityValue={36}
                soilMoistureValue={36}
                temperatureValue={36}
                isRain={false}
            />}
            {colapse && <FarrigaOneSensorsWrapper
                airUmidity={{
                    value: 36,
                    status: 'Normal',
                    lastUpdate: '23:10',
                    onChangePower: (on: boolean) => console.log('Desligou umidade do ar', on),
                    sensibility: {
                        label: 'Irriga quando menor que: ',
                        onChangeSensibility: (value: number) => console.log('Mudou a sensibilidade', value),
                        value: 36,
                        min: 0,
                        max: 100
                    }
                }}
                soilMoisture={{
                    value: 36,
                    status: 'Normal',
                    lastUpdate: '23:10',
                    on: true,
                    onChangePower: (on: boolean) => console.log('Desligou umidade do solo', on),
                    sensibility: {
                        label: 'Irriga quando menor que: ',
                        onChangeSensibility: (value: number) => console.log('Mudou a sensibilidade', value),
                        value: 36,
                        min: 0,
                        max: 100
                    }
                }}
                temperature={{
                    value: 36,
                    status: 'Normal',
                    lastUpdate: '23:10',
                    on: true,
                    onChangePower: (on: boolean) => console.log('Desligou temperatura', on),
                    sensibility: {
                        label: 'Irriga quando maior que: ',
                        onChangeSensibility: (value: number) => console.log('Mudou a sensibilidade', value),
                        value: 36,
                        min: 0,
                        max: 100
                    }
                }}
                rain={{
                    isRain: false,
                    status: 'Normal',
                    lastUpdate: '23:10',
                    on: true,
                    onChangePower: (on: boolean) => console.log('Desligou chuva', on)
                }}
            />}
            <TouchableHighlight onPressIn={() => toggleArrowDirection()} underlayColor={'#7eb88d'} onPress={() => console.log('Expandir')} style={{width: '100%', backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 4, marginBottom: 8}}>
                <Animated.View style={animatedStyle}>
                    <MaterialIcons name="expand-more" size={32} color="#ffffff" style={{backgroundColor: "#063511", elevation: 25, borderRadius: 100}}/>
                </Animated.View>
            </TouchableHighlight>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 60,
        borderRadius: 12,
        elevation: 24,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fff7',
        overflow: 'scroll'
    },
})

