import React, { useContext } from "react";
import { ActivityIndicator, Modal, Platform, Text, View } from "react-native";
import SlideHorizontal from "../Animation/SlideHorizontal";
import Button from "../Form/Button";
import { Feather } from '@expo/vector-icons';
import ToastManager from "toastify-react-native";
import { Ionicons } from '@expo/vector-icons';
import { Toast } from "toastify-react-native";
import FadeIn from "../Animation/FadeIn";
import { DevicesContext } from "../../Contexts/DevicesContext";

interface BluetoothModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccessfulDisconnect: () => void;
    deviceMacAddress: string;
}

export default function BluetoothDisconnectModal(props: BluetoothModalProps) {
    const [connectionStatus, setConnectionStatus] = React.useState<'not-initialized' | 'disconnecting' | 'disconnected'>('not-initialized');
    const [currentTimeout, setCurrentTimeout] = React.useState<NodeJS.Timeout | null>(null);

    const useBle = useContext(DevicesContext).bluetoothApi;

    const close = () => {
        if(currentTimeout) {
            clearTimeout(currentTimeout);
        }

        setConnectionStatus('not-initialized');

        props.onClose();
    }

    const notInitializedComponent = () => {
        return (
            <>
            <Text
                style={{fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16, paddingHorizontal: 16}}
            >Deseja se desconectar do dispositivo? Caso o dispositivo possua conexão com internet você ainda poderá opera-lo remotamente.</Text>  
            <Button
                text='Desconectar'
                onPress={async () => await startDisconnectionProcess()}
                size="sm"
                containerStyle={{width: '60%', alignSelf: 'center', marginBottom: 16}}
            />
            </>
        )
    }

    const disconnectingComponent = () => {
        return (
            <>
            <Text
                style={{fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16, paddingHorizontal: 16}}
            ><Text>Desconenctando-se</Text> do dispositivo de MacAddress: {props.deviceMacAddress}</Text>  
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }


    const disconnectComponent = () => {
        return (
            <FadeIn>
                <Text style={{textAlign: 'center', fontSize: 18, color: '#25572d', marginVertical: 16}}>Dispositivio desconectado com sucesso!</Text>
                <Ionicons name="checkmark-done" size={60} color="#25572d" style={{marginHorizontal: 'auto', marginBottom: 16}} />
            </FadeIn>
        )
    }

    const startDisconnectionProcess = async () => {
        setConnectionStatus('disconnecting');
        await disconnectDevice();
    }

    const disconnectDevice = async () => {
        await useBle.disconnectDevice('FarrigaTec');

        const timeout = setTimeout(async () => {
            useBle.stopScan();
            const isDesconnected = await useBle.isConnectedDevice('FarrigaTec');

            if(!isDesconnected) {
                setConnectionStatus('disconnected');
                return;
            }

            setConnectionStatus('not-initialized');
            Toast.error('Não foi possível desconectar do dispositivo, tente novamente.', 'bottom');
        }, 5000);

        setCurrentTimeout(timeout);
    }   

    return (
        <Modal
            transparent={true}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }} 
            visible={props.visible}
        >
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ToastManager
                height={'auto'}
                textStyle={{fontSize: 16, padding: 8, textAlign: 'center'}}
                style={{paddingRight: 32, width: '90%'}}
                positionValue={100}
                duration={8000}
            />
            <SlideHorizontal
                    style={{
                        backgroundColor: '#ffffff',
                        width: '85%',
                        paddingHorizontal: 8,
                        paddingVertical: 32,
                        borderRadius: 12,
                        elevation: 24,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{fontSize: 18, color: '#235818', textAlign: 'center', marginBottom: 16}}>Conexão via Bluetooth</Text>
                    <Feather name="bluetooth" size={36} color="#141f80"/>
                    
                    {connectionStatus === 'not-initialized' && notInitializedComponent()}
                    {connectionStatus === 'disconnecting' && disconnectingComponent()}
                    {connectionStatus === 'disconnected' && disconnectComponent()}

                    {connectionStatus !== 'disconnected' ? 
                    <Text
                        onPress={() => close()}
                        style={{fontSize: 16, color: '#666', textAlign: 'center'}}
                    >Cancelar</Text> : 
                    <Text
                        onPress={() => close()}
                        style={{fontSize: 16, color: '#666', textAlign: 'center'}}
                    >Sair</Text>  
                    }
                    
                </SlideHorizontal>
            </View>
        </Modal>
    )
}