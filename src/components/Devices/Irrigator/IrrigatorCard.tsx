import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import React from "react";
import OnOffButton from "../../OnOffButton";

interface IrrigatorCardProps {
    canStartStop: boolean;
    name: string;
    position: number;
    currentActivity?: number | string | undefined;
    unit?: string;
    status?: string;
    lastUpdate?: string;
    model: string;
    alias: string;
}
export default function IrrigatorCard(props: IrrigatorCardProps) {
    const [configVisible, setConfigVisible] = useState(false);

    return (
        <View style={styles.wrapper}>    
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'flex-start', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems:'center', gap: 8}}>
                        <MaterialCommunityIcons name="watering-can" size={24} color="#25572d" />            
                        <Text style={{fontSize: 14, fontWeight: 600, color: '#028f19'}}>{props.name}:  
                            <Text style={{fontSize: 18, marginTop: 4, color: '#25572d'}}> {props.currentActivity || '--'}{props.unit || ''}</Text>
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
                    </View>
                </View>
                <OnOffButton onClick={() => console.log('alterei o power')} on/>
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