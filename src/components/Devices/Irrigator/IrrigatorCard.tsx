import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import React from "react";
import OnOffButton from "../../OnOffButton";
import { useEventEmitter } from "../../../Hooks/useEventEmitter";

interface IrrigatorCardProps {
    canStartStop: boolean;
    macAddress: string;
    id: string;
    name: string;
    position: number;
    unit?: string;
    status?: string;
    lastUpdate?: Date | undefined;
    model: string;
    alias: string;
    irrigating: boolean;
    irrigationStartedAt?: Date;
    irrigationStopedAt?: Date;
}
export default function IrrigatorCard(props: IrrigatorCardProps) {
    const [configVisible, setConfigVisible] = useState(false);
    const [irrigating, setIrrigating] = useState(false);
    const { emitEvent } = useEventEmitter();

    const handleStartIrrigation = () => {
        emitEvent("startIrrigation", {
            irrigatorId: props.id,
            macAddress: props.macAddress,
        });
    }

    const handleStopIrrigation = () => {
        emitEvent('stopIrrigation', {
            irrigatorId: props.id,
            macAddress: props.macAddress,
        });
    }

    const handleClickDisableEnable = () => {
        if(irrigating && props.canStartStop) 
            handleStopIrrigation();
        
        if(!irrigating && props.canStartStop)
            handleStartIrrigation();


        setIrrigating(!irrigating);
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


    return (
        <View style={styles.wrapper}>    
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'flex-start', justifyContent:'center', width: '70%'}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems:'center', gap: 8}}>
                        <MaterialCommunityIcons name="watering-can" size={24} color="#25572d" />            
                        <Text style={{fontSize: 14, fontWeight: 600, color: '#028f19'}}>{props.name}:  
                            <Text style={{fontSize: 12, marginTop: 4, color: '#25572d'}}> {props.irrigating ? 'Irrigando' : 'Em espera'}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Status: </Text> 
                            <Text style={{fontSize: 12}}>{props.status || 'Não conectado'}</Text>
                        </Text>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Data atualização: </Text>
                            <Text style={{fontSize: 12}}>{props.lastUpdate ? '\n' + formatDate(props.lastUpdate) : '--'}</Text>
                        </Text>                        
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Irrigação começou as:  </Text>
                            <Text style={{fontSize: 12}}>{props.irrigationStartedAt ? '\n' + formatDate(props.irrigationStartedAt) : '--'}</Text>
                        </Text>                        
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Irrigação acabou as:  </Text>
                            <Text style={{fontSize: 12}}>{props.irrigationStopedAt ? '\n' + formatDate(props.irrigationStopedAt) : '--'}</Text>
                        </Text>                        
                    </View>
                </View>
                <View style={{gap: 3, width: 70}}>
                    <OnOffButton onClick={() => handleStartIrrigation()} on={false} offText="Iniciar Irrigação" onText="Desabilitar Sensor" width={66} fontSize={10} height={40} noIcon/>
                    <OnOffButton onClick={() => handleStopIrrigation()} on={true} offText="Parar irrigação" onText="Parar Irrigação" width={66} fontSize={10} height={40} noIcon/>
                </View>
            </View>  
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