import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import Button from "./Form/Button";
import Input from "./Form/Input/Input";
import LocalConfig from "../services/LocalConfig";
import AuthService from "../services/AuthService";

interface ModalConfigProps {
    onClose: () => void;
    visible: boolean;
}

export default function ModalCanUseBio(props: ModalConfigProps) {
    const [dontAsk, setDontAsk] = useState(false);

    function close(email: string = ''){
        if(dontAsk) LocalConfig.enableDontAskBiometricAuth(email);
        props.onClose();
    }

    async function admit(){
        let currentUserEmail = await AuthService.lastLoggedEmail();
        console.log(currentUserEmail);
        await LocalConfig.enableBiometricAuth(currentUserEmail ?? '');
        close(currentUserEmail ?? '');
    }

    return (
        <Modal   
            transparent={true}      
            style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignContent: 'flex-end',
            }} 
            visible={props.visible}
        >
            <View style={{flex: 1, backgroundColor: '#00000050'}}></View>   
            <View style={{position: "absolute", bottom: 0, padding: 36, width: '100%', backgroundColor:"#ffffff"}}>
                <Text style={{fontSize: 18, color: '#666', textAlign: 'center', marginBottom: 24}}>Deseja habilitar o login pela biometria?</Text>
                <Button
                    text="Permitir"
                    onPress={admit}
                    containerStyle={{marginBottom: 16}}
                />
                <Input 
                    containerStyle={{marginBottom:16}} 
                    type="checkbox" placeholder="Checkbox" 
                    label="Não perguntar mais" 
                    labelStyle={{width: 180}}
                    checked={dontAsk}
                    onPress={() => setDontAsk(!dontAsk)}    
                />
                <Text
                    onPress={() => close()}
                    style={{fontSize: 16, color: '#666', textAlign: 'center', width: '100%'}}
                >Fechar</Text>           
            </View>
        </Modal>
    );
}