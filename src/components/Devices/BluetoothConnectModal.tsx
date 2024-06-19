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
    onSuccessfulConnection: () => void;
    deviceMacAddress: string;
}

export default function BluetoothConnectModal(props: BluetoothModalProps) {
    const [connectionStatus, setConnectionStatus] = React.useState<'not-initialized' | 'searching' | 'found' | 'connecting' | 'connected'>('not-initialized');
    const [currentTimeout, setCurrentTimeout] = React.useState<NodeJS.Timeout | null>(null);

    const useBle = useContext(DevicesContext).bluetoothApi;

    const close = () => {
        if(connectionStatus === 'searching') {
            useBle.stopScan();
        }

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
            >Enquanto o dispositivo estiver conectado via bluetooth outras conexões via Wifi serão abortadas</Text>  
            <Button
                text='Iniciar conexão'
                onPress={async () => await startConnectionProcess()}
                size="sm"
                containerStyle={{width: '60%', alignSelf: 'center', marginBottom: 16}}
            />
            </>
        )
    }

    const searchComponent = () => {
        return (
            <>
            <Text
                style={{fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16, paddingHorizontal: 16}}
            ><Text>Buscando</Text> dispositivo de MacAddress: {props.deviceMacAddress}</Text>  
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }

    const foundComponent = () => {
        return (
            <>
            <Text
                style={{fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16, paddingHorizontal: 16}}
            >Dispositivo encontrado, inciando conexão...</Text>  
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }

    const connectingComponent = () => {
        return (
            <>
            <Text
                style={{fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16, paddingHorizontal: 16}}
            >Conectando ao dispositivo...</Text>  
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }

    const connectedComponent = () => {
        return (
            <FadeIn>
                <Text style={{textAlign: 'center', fontSize: 18, color: '#25572d', marginVertical: 16}}>Dispositivio conectado com sucesso!</Text>
                <Ionicons name="checkmark-done" size={60} color="#25572d" style={{marginHorizontal: 'auto', marginBottom: 16}} />
            </FadeIn>
        )
    }

    const startConnectionProcess = async () => {
        let hasPermissions = await useBle.requestPermissions();

        if(!hasPermissions) {
            Toast.error('Verifique as permissões e permita acesso ao bluetooth e localização para possiblitar o uso do bluetooth.', 'bottom');
            return;
        }   

        let isBluetoothEnabled = await useBle.isBlutoothEnabled();
        if (!isBluetoothEnabled && Platform.OS === 'android') {
            isBluetoothEnabled = useBle.andoridEnableBluetooth();

            if(!isBluetoothEnabled) {
                Toast.error('Bluetooth não está habilitado, ative o bluetooth e tente novamente.', 'bottom');
                return;
            }
        }

        if(!isBluetoothEnabled && Platform.OS === 'ios') {
            Toast.error('Bluetooth não está habilitado, ative o bluetooth e tente novamente.', 'bottom');
            return;
        }
        searchDevice();
    }

    const searchDevice = async () => {
        setConnectionStatus('searching');
        useBle.scanUntilFindDevice('FarrigaTec');

        const timeout = setTimeout(() => {
            useBle.stopScan();

            if(useBle.isFoundDevice('FarrigaTec')) {
                setConnectionStatus('found');
                onFoundDevice();
                return;
            }

            Toast.error('Não foi possível encontrar o dispositivo, verifique se o dispositivo está ligado e próximo ao seu local.', 'bottom');
            setConnectionStatus('not-initialized');
            return;
        }, 15000);

        setCurrentTimeout(timeout);
    }   

    const onFoundDevice = () => {
        const timeout = setTimeout(() => {
            setConnectionStatus('connecting');
            onStartConnection();
        }, 3000)
        setCurrentTimeout(timeout);
    }

    const onStartConnection = () => {
        useBle.connectToDevice('FarrigaTec').then((connected) => {
            if(connected) {
                setConnectionStatus('connected');
                props.onSuccessfulConnection();
                return;
            }

            Toast.error('Não foi possível conectar ao dispositivo, verifique se o dispositivo está ligado e próximo ao seu local.', 'bottom');
            setConnectionStatus('not-initialized');
        })
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
                    {connectionStatus === 'searching' && searchComponent()}
                    {connectionStatus === 'found' && foundComponent()}
                    {connectionStatus === 'connecting' && connectingComponent()}
                    {connectionStatus === 'connected' && connectedComponent()}

                    {connectionStatus !== 'connected' ? 
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