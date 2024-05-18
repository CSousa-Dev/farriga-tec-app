import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import OnOffButton from "../OnOffButton";
import ModalConfig from "../ModalConfg";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';

interface SensorCardProps {
    sensibility?: {
        label: string;
        onChangeSensibility: (value: number) => void;
        value: number;
        min: number;
        max: number;
    };
    on: boolean;
    onChangePower: () => void;
    title: string;
    value: number | string;
    sulfix?: string;
    status: string;
    lastUpdate: string;
    icon: React.ReactNode;
}
export default function SensorCard(props: SensorCardProps) {
    const [configVisible, setConfigVisible] = useState(false);

    return (
        <View style={styles.wrapper}>    
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'flex-start', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', justifyContent: 'center', alignItems:'center', gap: 8}}>
                        {props.icon}
                        <Text style={{fontSize: 14, fontWeight: 600, color: '#028f19'}}>{props.title}:  
                            <Text style={{fontSize: 18, marginTop: 4, color: '#25572d'}}> {props.value}{props.sulfix || ''}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Status: </Text> 
                            {props.status}
                        </Text>
                        <Text>
                            <Text style={{color: '#028f19', fontSize: 14}}>Data atualização: </Text>
                            {props.lastUpdate}
                        </Text>

                        {props.sensibility &&
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                            <Text>
                                <Text style={{color: '#028f19', fontSize: 14}}>{props.sensibility.label}</Text>
                                {props.sensibility.value}{props.sulfix}
                            </Text>
                            <TouchableHighlight underlayColor={'#75b886'} onPress={() => setConfigVisible(true)} style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
                                <Feather name="edit" size={20} color="#1d4926" style={{padding: 2, borderRadius: 4}}/>
                            </TouchableHighlight>
                        </View>
                        }
                    </View>
                </View>
                <OnOffButton onClick={() => props.onChangePower && props.onChangePower()} on/>
            </View>
            {props.sensibility &&
                <ModalConfig
                visible={configVisible}
                sensorName={props.title}
                onClose={() => setConfigVisible(false)}
                onSave={(value) => props.sensibility?.onChangeSensibility(value)}
                maxValue={props.sensibility.max}
                minValue={props.sensibility.min}
                initialValue={props.sensibility.value}
                sulfix={props.sulfix}
                />
            }     
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff',
        width: '94%',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 24,
        marginBottom: 16
    },
})