import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import NoDevicesFound from "../components/Devices/NoDevicesFound";
import AccountDevicesService, { DeviceData } from "../services/Account/AccountDevicesService";
import TopBar from "./TopBar";
import ModelFarrigaOne from "../components/Devices/Models/FarrigaOne/ModelFarrigaOne";
import Button from "../components/Form/Button";
import SearchingDevices from "../components/Devices/SearchingDevices";
import ModalCanUseBio from "../components/ModalCanUseBio";
import LocalConfig from "../services/LocalConfig";
import AuthService from "../services/AuthService";
import ModalNewDevice from "../components/Devices/ModalNewDevice";
import DevicesList from "../components/Devices/DevicesList";
import { DevicesContext } from "../Contexts/DevicesContext";

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<any, 'Home'> }) {
    const devicesContext = useContext(DevicesContext);
    const { isSearching, fetchDevices, devices } = devicesContext;
    const [searchingDelay, setSearchingDelay] = useState(true);
    const [modalCanUseBio, setModalCanUseBio] = useState(false);
    const [modalNewDevice, setModalNewDevice] = useState(false);
    // useEffect(() => {
    //     const getToken = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('@token');
    //             setToken(token as string);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     getToken();
    //     console.log('oi');

    //     const eventSource = new EventSource('http://192.168.15.45:8000/api/irrigation/events');
    //     eventSource.addEventListener('open', (event: any) => {console.log('')})
    //     eventSource.addEventListener('message', (event: any) => {
    //         console.log(event)
    //     });
        
    //     return () => {
    //         eventSource.close();
    //     };

    // }, []);
    useEffect(() => {
        const fetchAndLogDevices = async () => {
            await fetchDevices();
            console.log(devices); // Log depois de buscar os dispositivos
        };

        const canOpenAskBioModal = async () => {
            const loggedEmail = await AuthService.lastLoggedEmail();
            if(loggedEmail !== null){
                let canAsk = await LocalConfig.canAskBiometricAuth(loggedEmail);
                setModalCanUseBio(canAsk);
            }
        }

        const timer = setTimeout(() => {
            setSearchingDelay(false);
        }, 2000);

        canOpenAskBioModal();
        fetchAndLogDevices();

        return () => {
            clearTimeout(timer);
        };

    }, []);

    function closeModalCanUseBio(){
        setModalCanUseBio(false);
    }

    return (
        <View style={{justifyContent: "space-between", minHeight: '100%'}}>
        <TopBar/> 
        {
        searchingDelay || isSearching ? <SearchingDevices/> :
        Object.values(devices).length == 0 ? <NoDevicesFound/> :
        <>
            <DevicesList devices={Object.values(devices)}/>
            <Button
                text='Vincular Novo Dispositivo'
                onPress={() => setModalNewDevice(true)}
                containerStyle={{width: '85%', alignSelf: 'center', marginVertical: 36}}
            />
        </>
        }
        <ModalNewDevice visible={modalNewDevice} onClose={() => setModalNewDevice(false)}/>
        <ModalCanUseBio visible={modalCanUseBio} onClose={closeModalCanUseBio} />
        </View>
    );
}
