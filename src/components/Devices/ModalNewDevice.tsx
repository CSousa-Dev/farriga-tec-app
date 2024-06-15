import { Modal, View, Text, Pressable } from "react-native";
import SlideHorizontal from "../Animation/SlideHorizontal";
import Input from "../Form/Input/Input";
import Button from "../Form/Button";
import { useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import React from "react";
import { link } from "../../services/Account/AccountDevicesService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ModalNewDeviceProps {
    visible: boolean;
    onSucess?: () => void;
    onClose: () => void;
}

export default function ModalNewDevice(
    props: ModalNewDeviceProps
) {
    const [macAddress, setMacAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any,'SuccessfullyLinkedNewDevice'>>();
    
    function close() {
        setMacAddress('')
        props.onClose()
    }

    async function tryLinkDevice() {

        setLoading(true);

        try {
            const response = await link(macAddress);
            if(response && response.status == 200) {
                setLoading(false);

                if(props.onSucess) {
                    props.onSucess();
                }

                navigation.navigate('SuccessfullyLinkedNewDevice');

                return;
            }

            setLoading(false);
        } catch (error: any) {

            let message = 'Houve um erro ao tentar vincular o novo dispositivo.';

            if(error.response && error.response.data) {
                message = error.response.data.message;
            }

            Toast.error(message, 'bottom');
            setLoading(false);
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
                backgroundColor: '#00000096', 
                height:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <ToastManager
                height={'auto'}
                textStyle={{fontSize: 14, padding: 8, textAlign: 'center'}}
                style={{ width: 'auto', marginHorizontal: '5%'}}
                positionValue={100}
                duration={5000}
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
                    <Text style={{fontSize: 18, color: '#235818', textAlign: 'center', marginBottom: 16}}>Adicionar Novo Dispositivo</Text>
                    <Text
                        style={{fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 16}}
                    >Informe o número do dispositivo para vincula-lo a sua conta.</Text>   
                    <Input
                        value={macAddress}
                        onChange={!loading ? (e) => setMacAddress(e) : () => {}}
                        placeholder='Ex: Ab32Cf12'
                        containerStyle={{width: '60%', alignSelf: 'center', marginBottom: 16}}
                    />
                    <Button
                        disabled={macAddress.length < 1 && !loading}
                        loading={loading}
                        text='Vincular'
                        onPress={async () => await tryLinkDevice()}
                        size="sm"
                        containerStyle={{width: '60%', alignSelf: 'center', marginBottom: 16}}
                    />
                    <Text
                        onPress={() => close()}
                        style={{fontSize: 16, color: '#666', textAlign: 'center'}}
                    >Cancelar</Text>
                </SlideHorizontal>
            </Pressable>
        </Modal>
    );
}