import { Text, Image } from "react-native";
import Button from "../Form/Button";
import SlideHorizontal from "../Animation/SlideHorizontal";
import ModalNewDevice from "./ModalNewDevice";
import { useContext, useState } from "react";
import React from "react";
import { DevicesContext, DevicesProvider } from "../../Contexts/DevicesContext";

export default function NoDevicesFound()
{
    const [modalVisible, setModalVisible] = useState(false);
    const devicesContext = useContext(DevicesContext);
    const { fetchDevices } = devicesContext;
    const handleSuccess = async () => {
        await fetchDevices();
    }
    return (
        <SlideHorizontal style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                style={{textAlign: 'center', fontSize: 18, color: '#666', marginHorizontal: 16, marginTop: 16}}
            >Uhm... Parece que você ainda não possui nenhum dispositivo conectado.</Text>
            <Image 
                style={{
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    height: 300,
                    width: 300,
                    marginBottom: 16
                }}
                source={require('../../../assets/no-sinc.png')} 
            />
            <Text
                style={{
                    textAlign: 'center', 
                    fontSize: 16, 
                    color: '#666', 
                    marginHorizontal: 16, 
                    marginBottom: 16,
                    paddingHorizontal: 36
                }}
            >Clique no botão abaixo para vincular um novo dispositivo.</Text>
            <Button
                text='Vincular Dispositivo'
                onPress={() => setModalVisible(true)}
                containerStyle={{width: '85%', alignSelf: 'center'}}
            />
            <ModalNewDevice 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSucess={() => handleSuccess()}
            />
        </SlideHorizontal>
    )
}