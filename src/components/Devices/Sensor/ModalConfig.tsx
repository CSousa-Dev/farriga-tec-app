import { LinearGradient } from "expo-linear-gradient";
import { Modal, View, Text, Pressable } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Button from "../../Form/Button";
import { useContext, useState } from "react";
import React from "react";
import SlideHorizontal from "../../Animation/SlideHorizontal";
import { DevicesContext } from "../../../Contexts/DevicesContext";
import ToastManager, { Toast } from "toastify-react-native";

interface ModalConfigProps {
    onClose: () => void;
    onSave: (value: number) => void;
    initialValue: number;
    unit?: string;
    visible: boolean;
    sensorName: string;
    macAddress: string;
}

export default function ModalConfig(props: ModalConfigProps) {
    const [fill, setFill] = useState(props.initialValue);
    const deviceContext = useContext(DevicesContext);

    function increase() {
        if(fill < 100) {
            setFill(fill + 1)
        }
    }

    function decrease() {
        if(fill > 0) {
            setFill(fill - 1)
        }
    }

    function onClose(){
        setFill(props.initialValue)
        props.onClose()
    }

    const tresholdChange = async (value: number) => {
        try{
            deviceContext.sendMessage(props.macAddress, 'changeTreshold', {
                macAddress: props.macAddress,
                sensorId: props.sensorName,
                threshold: value
            });
            Toast.success('Novo limiar enviado com sucesso', 'bottom');
        } catch {
            Toast.error('Erro ao enviar mensagem para o dispositivo, verifique se o dispositivo está conectado a internet ou ao bluetooth', 'bottom');
        }
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
            <Pressable style={{
                width: '100%', 
                backgroundColor: '#00000050', 
                height:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SlideHorizontal
                    style={{
                        backgroundColor: '#ffffff',
                        width: '85%',
                        paddingHorizontal: 16,
                        paddingVertical: 32,
                        borderRadius: 12,
                        elevation: 24,
                        alignItems: 'center'
                    }}
                >
                <ToastManager
                    height={'auto'}
                    textStyle={{fontSize: 16, padding: 8, textAlign: 'center'}}
                    style={{paddingRight: 32, width: '90%'}}
                    positionValue={200}
                    duration={5000}
                />  
                    <View style={{alignSelf: 'center', marginBottom: 24, width:'100%'}}>
                        <Text style={{textAlign: "center", fontSize: 18, fontWeight: 500, color: '#186b29'}}>Configuração de Limiar</Text>
                        <Text style={{fontSize:16, textAlign: "center", fontWeight: "bold", color: '#666', marginBottom: 8}}>{props.sensorName}</Text>
                        <Text style={{textAlign: "center", color: "#666", fontSize: 16, paddingHorizontal: 16, width: '100%'}}>Altere os limites para ativação automática da irrigação</Text>
                    </View>
                    <AnimatedCircularProgress
                    size={220}
                    width={40}
                    fill={fill}
                    tintTransparency={true}
                    arcSweepAngle={260}
                    rotation={230}
                    dashedTint={{
                        width: 5,
                        gap: 5
                    }}
                    dashedBackground={{
                        width: 5,
                        gap: 5
                    }}
                    tintColor="#00a11b"
                    backgroundColor="#399c4b44"
                    >
                    {
                        () => (
                        <LinearGradient
                            colors={['#045f1845', '#1d722bdd','#1d722bdc', '#1d492640']}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 55
                            }}

                        >
                            <Text style={{color:"#ffffff", fontSize:24, fontWeight: 'bold'}}>{fill}{props.unit}</Text>
                        </LinearGradient>
                        )
                    }
                    </AnimatedCircularProgress>
                    <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 16}}>
                        <Button text="-" type="outlined" containerStyle={{width: 60}}  onPress={decrease}/>
                        <Button text="+" containerStyle={{width: 60}} onPress={increase}/>
                    </View>
                    <View style={{flexDirection:'row', gap: 12, marginTop: 18}}>
                        <Button text="Fechar" type="outlined" containerStyle={{width: 120}} onPress={() => onClose()}/>
                        <Button text="Salvar" containerStyle={{width: 120}} onPress={async () => await tresholdChange(fill)}/>
                    </View>
                </SlideHorizontal>
            </Pressable>
        </Modal>
    )
}
