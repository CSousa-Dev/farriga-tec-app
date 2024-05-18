import { LinearGradient } from "expo-linear-gradient";
import { Modal, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Button from "./Form/Button";
import { useState } from "react";
import FadeIn from "./FadeIn";
import Slide from "./Slide";

interface ModalConfigProps {
    onClose: () => void;
    onSave: (value: number) => void;
    maxValue: number;
    minValue: number;
    initialValue: number;
    sulfix?: string;
    visible: boolean;
    sensorName: string;
}

export default function ModalConfig(props: ModalConfigProps) {
    const [fill, setFill] = useState(props.initialValue);

    function increase() {
        if(fill < props.maxValue) {
            setFill(fill + 1)
        }
    }

    function decrease() {
        if(fill > props.minValue) {
            setFill(fill - 1)
        }
    }

    function onClose(){
        setFill(props.initialValue)
        props.onClose()
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
            <View style={{
                width: '100%', 
                backgroundColor: '#00000050', 
                height:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Slide
                    style={{
                        backgroundColor: '#ffffff',
                        width: '85%',
                        height: '70%',
                        paddingHorizontal: 16,
                        paddingVertical: 32,
                        borderRadius: 12,
                        elevation: 24,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View style={{alignSelf: 'flex-start', marginBottom: 40}}>
                        <Text style={{fontSize:16}}><Text style={{color: '#186b29'}}>Sensor: </Text>{props.sensorName}</Text>
                        <Text style={{fontSize:16}}><Text style={{color: '#186b29'}}>Valor configurado: </Text>{props.initialValue}{props.sulfix}</Text>
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
                    onAnimationComplete={() => console.log('onAnimationComplete')}
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
                            <Text style={{color:"#ffffff", fontSize:24, fontWeight: 'bold'}}>{fill}{props.sulfix}</Text>
                        </LinearGradient>
                        )
                    }
                    </AnimatedCircularProgress>
                    <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 16}}>
                        <Button text="-" type="outlined" containerStyle={{width: 60}}  onPress={decrease}/>
                        <Button text="+" containerStyle={{width: 60}} onPress={increase}/>
                    </View>
                    <View style={{flexDirection:'row', gap: 12, marginTop: 64}}>
                        <Button text="Cancelar" type="outlined" containerStyle={{width: 120}} onPress={() => onClose()}/>
                        <Button text="Salvar" containerStyle={{width: 120}} onPress={() => props.onSave(fill)}/>
                    </View>
                </Slide>
            </View>
        </Modal>
    )
}
