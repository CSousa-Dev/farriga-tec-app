import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import EventModal from "../EventModal";
import { useEventEmitter } from "../../../Hooks/useEventEmitter";
import Button from "../../Form/Button";
import useBLE from "../../../Hooks/useBle";
import { DevicesContext } from "../../../Contexts/DevicesContext";
import DataTransfer from "../../Animation/DataTransfer";
import { Ionicons } from '@expo/vector-icons';


export default function HandleDeviceOnOff(){
    const [visible, setVisible] = React.useState(false);
    const [macAddress, setMacAddress] = React.useState<string>('');
    const [action, setAction] = React.useState<'on' | 'off'>('on');
    const [currentTimeout, setCurrentTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [errorMessage , setErrorMessage] = React.useState<string>('');
    const [step, setStep] = React.useState<'question' | 'sending' | 'pending' | 'success' | 'error'>('question');
    const { useEventListener } = useEventEmitter();
    const deviceContext = useContext(DevicesContext);

    useEventListener('powerOffDevice', ({macAddress}) => {
        setVisible(true);
        setMacAddress(macAddress);
        setAction('off');
    });

    useEventListener('powerOnDevice', () => {
        setVisible(true);
    })

    const handleClose = () => {
        setVisible(false);
        setStep('question');
        setErrorMessage('');
        if(currentTimeout)
            clearTimeout(currentTimeout);
    }

    const hanldePowerOn = async () => {
        setStep('sending');
        try {
            await deviceContext.sendMessage(macAddress, "powerOnDevice", {
                macAddress: macAddress
            });
        } catch (error) {
            setStep('error');
        }

        
        const timeout = setTimeout(async () => {
            success();
        }, 3000)    
        setCurrentTimeout(timeout);   
    }

    const handlePowerOff = async () => {
        setStep('sending');

        try {
            await deviceContext.sendMessage(macAddress, 'powerOffDevice',{macAddress: macAddress});
        } catch (error: any) {
            setErrorMessage(error.message)
            setStep('error');
        }

        const timeout = setTimeout(async () => {
            success();
        }, 3000)    
        setCurrentTimeout(timeout);   
    }


    // const pendingConfirmation = async () => {
    //     setStep('pending');
    //     try {
    //         await deviceContext.sendMessage(macAddress, {event: 'power', message:'off'});
    //     } catch (error: any) {
    //         setErrorMessage(error.message)
    //         setStep('error');
    //     }

    //     const timeout = setTimeout(() => {
    //         success();
    //     }, 3000)   
    //     setCurrentTimeout(timeout);
    // }

    const success = () => {
        setStep('success');
        const timeout = setTimeout(() => {
            setVisible(false);
            setStep('question');
        }, 3000)
        setCurrentTimeout(timeout);
    }

    function QuestionComponent(){
        return (
            <>
            <Text
                style={{
                    width: '100%',
                    fontSize: 18,
                    marginBottom: 16,
                    color: '#235818',
                    textAlign: 'center'
                    
                }}
            >
                {action == 'off' ? 'Desejsa reiniciar o dispositivo?' : 'Deseja ligar o dispositivo?'}
            </Text>
            <Text
                style={{
                    width: '100%',
                    fontSize: 16,
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: 24
                }}
            >
                {
                    action == 'off' ? 
                    'Ao realizar essa ação, todas as configurações do dispositivo serão resetadas para as configurações originais, será necessário reconfigurar o wifi e caso esteja atualmente conectado via bluetooth se conectar novamente.' : 
                    'Ao ligar o dispositivo todas as funcionalidades serão reestabelecidas, permitindo a leitura dos sensores e ativação da irrigação, tanto automática quanto manual.'
                }
            </Text>
            <Button
                text={action == 'off' ? 'Reiniciar mesmo assim' : 'Ligar dispositivo'}
                onPress={action == 'off' ? handlePowerOff : hanldePowerOn}
            />
            </>
        )
    }

    function SendingComponent() {
        return (
            <>
            <Text
                style={{
                    width: '100%',
                    fontSize: 18,
                    marginBottom: 16,
                    color: '#235818',
                    textAlign: 'center'
                    
                }}
            >
                Enviando sinal 
            </Text>
            <Text
                style={{
                    width: '100%',
                    fontSize: 16,
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: 24
                }}
            >
                {
                    action == 'off' ? 
                    'Desligando o dispositivo, aguarde um momento.' : 
                    'Ligando o dispositivo, aguarde um momento.'
                }
            </Text>
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }

    function PendingComponent () {
        return (
            <>
            <Text
                style={{
                    width: '100%',
                    fontSize: 18,
                    marginBottom: 16,
                    color: '#235818',
                    textAlign: 'center'
                    
                }}
            >
                Aguardando confirmação
            </Text>
            <Text
                style={{
                    width: '100%',
                    fontSize: 16,
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: 24
                }}
            >
                {
                    action == 'off' ? 
                    'Aguardando confirmação de que o dispotivo foi desligado.' : 
                    'Aguardando confirmação de que o dispositivo foi ligado.'
                }
            </Text>
            <ActivityIndicator size="large" color="#0f9e20" style={{marginBottom: 32}}/>
            </>
        )
    }

    function SuccessComponent () {
        return (
            <>
            <Text
                style={{
                    width: '100%',
                    fontSize: 18,
                    marginBottom: 16,
                    color: '#235818',
                    textAlign: 'center'
                    
                }}
            >
                {action == 'off' ? 'Dispositivo desligado com sucesso' : 'Dispositivo ligado com sucesso'}
            </Text>
            <Ionicons name="checkmark-done" size={60} color="#25572d" style={{marginHorizontal: 'auto', marginBottom: 16}} />
            </>
        )
    }

    function ErrorComponent () {
        clearTimeout(currentTimeout!);

        return (
            <>
            <Text
                style={{
                    width: '100%',
                    fontSize: 18,
                    marginBottom: 16,
                    color: '#235818',
                    textAlign: 'center'
                    
                }}
            >Ops... não foi possível finalizar a ação</Text>
            <Text
                style={{
                    width: '100%',
                    fontSize: 16,
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: 24
                }}>
                    Verifique se o dispositivo está ativo e devidamene conectado a internet ou ao aplicativo via bluetooth.
                </Text>
            </>
        )
    }
    
    return (
        <EventModal
            visible={visible}
            onClose={() => handleClose()}
        >
            <View style={{width: '100%', justifyContent: 'center', alignItems:"center"}}>
                {step == 'question' && <QuestionComponent/>} 
                {step == 'sending' && <SendingComponent/>}
                {step == 'pending' && <PendingComponent/>}
                {step == 'success' && <SuccessComponent/>}
                {step == 'error' && <ErrorComponent/>}
            </View>
        </EventModal>
    )
}