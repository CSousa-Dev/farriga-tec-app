import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import React from "react";
import IconSelector from "./IconSelector";
import ModalConfig from "./ModalConfig";
import OnOffButton from "../../OnOffButton";

interface SensorCardProps {
    tresholdValue?: number;
    canChangeTreshold: boolean;
    canStartStop: boolean;
    name: string;
    currentMeasure?: number | string | undefined;
    unit?: string;
    status?: string;
    lastUpdate?: string;
    model: string;
}
export default function SensorCard(props: SensorCardProps) {
    const [configVisible, setConfigVisible] = useState(false);

    return (
        <View style={styles.wrapper}>    
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'flex-start', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems:'center', gap: 8}}>
                        <IconSelector sensorModel={props.model}/>
                        <Text style={{fontSize: 14, fontWeight: 600, color: '#028f19'}}>{props.name}:  
                            <Text style={{fontSize: 18, marginTop: 4, color: '#25572d'}}> {props.currentMeasure || '--'}{props.unit || ''}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Status: </Text> 
                            {props.status || 'Não conectado'}
                        </Text>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Data atualização: </Text>
                            {props.lastUpdate || '--'}
                        </Text>

                        {props.canChangeTreshold &&
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                            <Text>
                                <Text style={{color: '#028f19', fontSize: 14}}>Limiar {props.name}: </Text>
                                {props.tresholdValue || 0}{props.unit}
                            </Text>
                            <TouchableHighlight underlayColor={'#75b886'} onPress={() => setConfigVisible(true)} style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
                                <Feather name="edit" size={18} color="#1d4926" style={{padding: 2, borderRadius: 4}}/>
                            </TouchableHighlight>
                        </View>
                        }
                    </View>
                </View>
                <OnOffButton onClick={() => console.log('alterei o power')} on/>
            </View>
            {props.canChangeTreshold &&
                <ModalConfig
                visible={configVisible}
                sensorName={props.name}
                onClose={() => setConfigVisible(false)}
                onSave={(value) => console.log('mudouo')}
                initialValue={props.tresholdValue || 0}
                unit={props.unit}
                />
            }     
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 24,
        marginBottom: 16
    },
})