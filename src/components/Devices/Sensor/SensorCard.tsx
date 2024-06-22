import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import { useContext, useState } from "react";
import { Feather } from '@expo/vector-icons';
import React from "react";
import IconSelector from "./IconSelector";
import ModalConfig from "./ModalConfig";
import OnOffButton from "../../OnOffButton";
import { useEventEmitter } from "../../../Hooks/useEventEmitter";
import { format } from "url";
import Device from "../Device";
import { DevicesContext } from "../../../Contexts/DevicesContext";
import ToastManager, { Toast } from "toastify-react-native";

interface SensorCardProps {
    id: string;
    macAddress: string;
    tresholdValue?: number;
    canChangeTreshold: boolean;
    canStartStop: boolean;
    name: string;
    currentMeasure?: number | string | undefined;
    unit?: string;
    status?: string;
    lastUpdate?: Date;
    model: string;
}
export default function SensorCard(props: SensorCardProps) {
    const [configVisible, setConfigVisible] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const { emitEvent } = useEventEmitter();
    const deviceContext = useContext(DevicesContext);

    const handleDisableSensor = () => {
        emitEvent('disableSensor', {
            macAddress: props.macAddress,
            sensorId: props.name
        });
    }

    const handleEnableSensor = () => {
        emitEvent('enableSensor', {
            macAddress: props.macAddress,
            sensorId: props.name
        });
    }

    
    function formatDate(date: Date) {
        if (!date) return '';
    
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(d.getFullYear()).slice(-2); // Get last two digits of the year
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
    
        return `${day}/${month} ${hours}:${minutes}`;
    }


    const handleTresholdChange = (value: number) => {
        setConfigVisible(false);
    }

    const lastUpdateOccurredInLastMinute = () => {
        if (!props.lastUpdate) return false;
        const now = new Date();
        const diff = now.getTime() - props.lastUpdate.getTime();
        return diff < 60000;
    }

    return (
        <View style={styles.wrapper}>  
            
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            
                <View style={{alignItems: 'flex-start', justifyContent:'center', width: '70%'}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems:'center', gap: 8}}>
                        <IconSelector sensorModel={props.model}/>
                        <Text style={{fontSize: 14, fontWeight: 600, color: '#028f19'}}>{props.name}:  
                            <Text style={{fontSize: 14, marginTop: 4, color: '#25572d'}}> {props.currentMeasure || '--'} {props.unit || ''}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Status: </Text> 
                            <Text style={{fontSize: 12}}>{!lastUpdateOccurredInLastMinute() ? 'Não conectado' : 'conectado'}</Text>
                        </Text>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Data atualização: </Text>
                            <Text style={{fontSize: 12}}>{props.lastUpdate ? formatDate(props.lastUpdate) : '--'}</Text>
                        </Text>

                        {props.canChangeTreshold &&
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                            <Text>
                                <Text style={{color: '#028f19', fontSize: 14}}>Alterar Limiar: </Text>
                            </Text>
                            <TouchableHighlight underlayColor={'#75b886'} onPress={() => setConfigVisible(true)} style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
                                <Feather name="edit" size={18} color="#1d4926" style={{padding: 2, borderRadius: 4}}/>
                            </TouchableHighlight>
                        </View>
                        }
                    </View>
                </View>
                <View style={{gap: 3}}>
                    <OnOffButton onClick={() => handleEnableSensor()} on={false} offText="Habilitar Sensor" onText="Desabilitar Sensor" width={66} fontSize={10} height={40} noIcon/>
                    <OnOffButton onClick={() => handleDisableSensor()} on={true} offText="Habilitar Sensor" onText="Desabilitar Sensor" width={66} fontSize={10} height={40} noIcon/>
                </View>
            </View>
            {props.canChangeTreshold &&
                <ModalConfig
                visible={configVisible}
                sensorName={props.name}
                onClose={() => setConfigVisible(false)}
                onSave={(value) => handleTresholdChange(value)}
                initialValue={props.tresholdValue || 0}
                unit={props.unit}
                macAddress={props.macAddress}
                key={props.name}
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