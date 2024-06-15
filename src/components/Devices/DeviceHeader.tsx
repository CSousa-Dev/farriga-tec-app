import React from "react";
import { View, Text, StyleSheet } from "react-native";
import OnOffButton from "../OnOffButton";
import BluetoothButton from "../BluetoothButton";

interface DeviceHeaderProps {
    macAddress: string;
    deviceModel: string;
    deviceAlias: string;
    status?: string;
    canControllPower: boolean;
    canUseBluetooth: boolean;
    onPowerClick: () => void;
    onBluetoothClick: () => void;
    bluetoothOn: boolean;
    powerOn: boolean;
}

export default function DeviceHeader(props: DeviceHeaderProps){
    return (
        <View style={styles.wrapper}> 
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{color: '#ffffff', fontSize: 12}}>MacAddress: {props.macAddress}</Text>
                <Text style={{color: '#ffffff'}}>Disposivo:</Text>
                <Text style={{fontSize:18, fontWeight: 'bold', color: '#ffffff'}}>{props.deviceAlias || props.deviceModel}</Text>
                <Text style={{color: '#ffffff'}}>Status: {props.status || 'Não conectado'}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 6}}>
                {props.canUseBluetooth && <BluetoothButton onClick={() => props.onBluetoothClick()} on={props.bluetoothOn}/>}
                {props.canControllPower && <OnOffButton onClick={() => props.onPowerClick()} on={props.powerOn}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 8,
        justifyContent: 'space-between',
    }
});
