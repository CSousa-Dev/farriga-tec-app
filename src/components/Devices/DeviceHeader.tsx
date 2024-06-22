import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OnOffButton from "../OnOffButton";
import BluetoothButton from "../BluetoothButton";
import useBLE from "../../Hooks/useBle";
import BluetoothConnectModal from "./BluetoothConnectModal";
import { DevicesContext } from "../../Contexts/DevicesContext";
import BluetoothDisconnectModal from "./BluetoothDisconnectModal";
import { useEventEmitter } from "../../Hooks/useEventEmitter";
import { useNavigation } from "@react-navigation/native";

interface DeviceHeaderProps {
    macAddress: string;
    deviceModel: string;
    deviceAlias: string;
    status?: string;
    canControllPower: boolean;
    canUseBluetooth: boolean;
    lastReceivedEvent?: Date;
    onPowerClick: () => void;
    bluetoothOn?: boolean;
    powerOn: boolean;
}

export default function DeviceHeader(props: DeviceHeaderProps){
    const [bluetoothModalVisible , setBluetoothModalVisible] = React.useState<boolean>(false);
    const [bluetoothDisconnectModalVisible, setBluetoothDisconnectModalVisible] = React.useState<boolean>(false);
    const [bluetoothConnected, setBluetoothConnected] = React.useState<boolean>(false);
    const devicesContext = useContext(DevicesContext);
    const { useEventListener, emitEvent } = useEventEmitter();
    const ble = devicesContext.bluetoothApi;
    const navigation = useNavigation()


    useEffect(() => {
        checkDeviceIsBluetoothConnected();
    }, [ble.allConnectedDevices]);

    const checkDeviceIsBluetoothConnected = async () => {
        const isConnected = await ble.isConnectedDevice('FarrigaTec')
        if(isConnected){
            setBluetoothConnected(true);
            return;
        }

        setBluetoothConnected(false);
    }
    
    const onBluetoothClick = async () => {
        if(!props.canUseBluetooth){
            return;
        }

        checkDeviceIsBluetoothConnected();

        if(!bluetoothConnected){
            setBluetoothModalVisible(true);
            return;
        }

        setBluetoothDisconnectModalVisible(true);
    }

    const handleSuccessConnection = () => {
        devicesContext.setBluetoothStatus(props.macAddress, true);
    }

    const onPowerClick = async () => {
        emitEvent("powerOffDevice", {
            macAddress: props.macAddress
        });
    }

    const isReceivedEventInLastMinute = () => {
        if(!props.lastReceivedEvent){
            return false;
        }

        const now = new Date();
        const diff = now.getTime() - props.lastReceivedEvent.getTime();
        return diff < 60000;
    }

    return (
        <View style={styles.wrapper}> 
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '60%'}}>
                <Text style={{color: '#ffffff', fontSize: 10 , width:'100%'}}>MacAddress: {props.macAddress}</Text>
                <Text style={{color: '#ffffff', width:'100%'}}>Disposivo:</Text>
                <Text style={{fontSize:18, fontWeight: 'bold', color: '#ffffff'}}>{props.deviceAlias || props.deviceModel}</Text>
                <Text style={{color: '#ffffff'}}>Status: {isReceivedEventInLastMinute() ?  'Conectado' : bluetoothConnected ? 'Conectado via Bluetooth': 'Não conectado'}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap', width: '50%', }}>
                {props.canUseBluetooth && <BluetoothButton onClick={() => onBluetoothClick()} on={bluetoothConnected}/>}
                {props.canControllPower && <OnOffButton onClick={() => onPowerClick()} on={true} onText="Reiniciar dispositivo" offText="Ativar Dispositivo" height={70} width={70} fontSize={9}/>}
            </View>

            
            <BluetoothConnectModal visible={bluetoothModalVisible} onClose={() => setBluetoothModalVisible(false)} onSuccessfulConnection={() => handleSuccessConnection()} deviceMacAddress={props.macAddress}/>
            <BluetoothDisconnectModal visible={bluetoothDisconnectModalVisible} onClose={() => setBluetoothDisconnectModalVisible(false)} deviceMacAddress={props.macAddress} onSuccessfulDisconnect={() => console.log('disconneted')}/>
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
