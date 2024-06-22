import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import AccountDevicesService, { DeviceData } from '../services/Account/AccountDevicesService';
import useBLE from '../Hooks/useBle';
import BluetoothLowEnergyApiInterface from '../Hooks/BluetoothLowEnergyApiInterface';
import CheckInternetConnection from '../services/CheckInternetConnection';
import Paho from 'paho-mqtt';
import useMqtt from '../Hooks/useMQTT';
import { MqttMainHandler } from '../Handlers/MqttEventHandlers/MqttMainHandler';
import { EventData, EventType } from '../services/Events/EventType';
import { ChangeThresholdData } from '../services/Events/SensorEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DevicesContext = createContext({
    devices: {} as {[macAddress: string]: DeviceData},
    fetchDevices: async () => {},
    isSearching: false,
    bluetoothApi: {} as BluetoothLowEnergyApiInterface,
    setBluetoothStatus: (macAddress: string, status: boolean) => {},
    getDevice: (macAddress: string): DeviceData => ({} as DeviceData),
    updateDevice: (device: DeviceData) => {},
    sendMessage: async <T extends EventType>(macAddress:string , event: T, data: EventData[T]) => {}
});

export const DevicesProvider = ({children} : { children: ReactNode}) => {
    const bluetoothApi = useBLE();
    const mqttApi = useMqtt(
        // 'wss://88ca568013e749b9bfc102748937542d.s1.eu.hivemq.cloud:8884/mqtt',
        'wss://55ec0d36e5114bd0a9853f6f173935a5.s1.eu.hivemq.cloud:8884/mqtt',
        8884,
        'client-id',
        // 'teste@teste',
        'irrigaHorta',
        // 'Farriga@123',
        'Irriga@horta2024'
    );

    const [devices, setDevices] = useState<{[macAddress: string]: DeviceData}>({});
    const [isSearching, setIsSearching] = useState(false);

    const fetchDevices = async () => {
        setIsSearching(true);

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(1000);

        const devices = await AccountDevicesService.getAll();
        if(devices){
            let devicesObject: {[macAddress: string]: DeviceData} = {};
            devices.forEach(device => {
                devicesObject[device.macAddress] = device;
            });
            setDevices(devicesObject);
        }
        setIsSearching(false);
    }

    useEffect(() => {
        subscribeToMqttDeviceEvents();
        console.log('Subscribed to mqtt device events');
    }, [devices, mqttApi.client.isConnected()]);

    const subscribeToMqttDeviceEvents = () => {
        if(!mqttApi.client.isConnected()) return;

        Object.values(devices).forEach(device => {
            console.log('Subscribing to device: ', device.macAddress)
            mqttApi.subscribe(`${device.macAddress}/#`);
            console.log(`${device.macAddress}/#`)
        })
    }

    MqttMainHandler(
        Object.values(devices),
        (device) => {
            updateDevice(device);
        }
    );

    const setBluetoothStatus = (macAddress: string, status: boolean) => {
        let device = devices[macAddress];
        if(device){
            device.bluetoothOn = status;
            setDevices({...devices, [macAddress]: device});
        }
    }

    const isReceivedEventInLastMinute = (lastReceivedEvent: Date | undefined) => {
        if(!lastReceivedEvent){
            return false;
        }

        const now = new Date();
        const diff = now.getTime() - lastReceivedEvent.getTime();
        return diff < 60000;
    }

    const sendMessage = async <T extends EventType>(macAddress: string, event: T, data: EventData[T])  => {
        const device = devices[macAddress];
        if(!device) throw new Error('Dispositivo não localizado.');

        let isWifiConnected = await CheckInternetConnection();
        let isBluetoothConnected = await bluetoothApi.isConnectedDevice(macAddress);

        if(!isWifiConnected && !isBluetoothConnected) throw new Error('Não há conexão com internet e o dispositivo também não está conectado via bluetooth. Utilize uma das opções para enviar e receber informações.');

        if(isBluetoothConnected){
            const eventIdentifier = getBluetoothEventIdentifier(event, data);
            console.log(eventIdentifier)
            let eventKey = await getOnAsyncStorageBleMessageKey(eventIdentifier);
            if(!eventKey) return;
            
            if(event == 'changeTreshold')
                eventKey += (data as ChangeThresholdData).threshold.toString();

            console.log(eventKey);
            bluetoothApi.sendCommandToDevice(macAddress, eventKey);
            return;
        }

        if(isWifiConnected){
            if(!isReceivedEventInLastMinute(device.lastReceivedEvent)){
                throw new Error('Dispositivo não conectado a rede wifi ou sem conecxão com internet.');
            }

            const {topic, message} = makeMqttTopic(macAddress, event, data);
            mqttApi.sendMessage(message, topic);
        }
    }

    const getOnAsyncStorageBleMessageKey =  async (event: string) => {
        return await AsyncStorage.getItem(event); 
    }

    const makeMqttTopic = <T extends EventType>(macAddress: string, event: T, data: EventData[T] ): {topic: string, message: string} => {
        let parsedEvent = '';
        if(event == 'powerOffDevice')
            return {topic: `${macAddress}/reset`, message: 'true'};
        
        if(event == 'disableSensor' || event == 'enableSensor'){
            if('sensorId' in data && data.sensorId  == 'Temperatura')
                parsedEvent = 'usaTemperatura'

            if('sensorId' in data && data.sensorId  == 'Umidade do Solo')
                parsedEvent = 'usaUmidadeDoSolo'

            if('sensorId' in data && data.sensorId  == 'Umidade do Ar')
                parsedEvent = 'usaUmidadeDoAr'

            if('sensorId' in data && data.sensorId  == 'Chuva')
                parsedEvent = 'usaChuva'

            let disableOrEnable = event == 'disableSensor' ? 'false' : 'true'

            return {topic: `${macAddress}/${parsedEvent}`, message: disableOrEnable};
        }

        if(event == 'changeTreshold'){
            console.log(event)
            parsedEvent = 'limiar'
            if('sensorId' in data && data.sensorId  == 'Temperatura')
                parsedEvent += 'Temperatura'

            if('sensorId' in data && data.sensorId  == 'Umidade do Solo')
                parsedEvent += 'UmidadeDoSolo'

            if('sensorId' in data && data.sensorId  == 'Umidade do Ar')
                parsedEvent += 'UmidadeDoAr'

            return {topic: `${macAddress}/${parsedEvent}`, message: (data as ChangeThresholdData).threshold.toString()};
        }

        if(event == 'startIrrigation' || event == 'stopIrrigation'){
            return {topic: `${macAddress}/irrigar`, message: event == 'startIrrigation' ? 'true' : 'false'};
        }
        console.log(event, data)
        throw new Error('Evento não reconhecido.');
    }

    const getBluetoothEventIdentifier = <T extends EventType>(event: T, data: EventData[T] ) => {
        let parsedEvent = '';
        if(event == 'powerOffDevice')
            return 'reset';
        
        if(event == 'disableSensor' || event == 'enableSensor'){
            if('sensorId' in data && data.sensorId  == 'Temperatura')
                parsedEvent = 'usaTemperatura'

            if('sensorId' in data && data.sensorId  == 'Umidade do Solo')
                parsedEvent = 'usaUmidadeDoSolo'

            if('sensorId' in data && data.sensorId  == 'Umidade do Ar')
                parsedEvent = 'usaUmidadeDoAr'

            if('sensorId' in data && data.sensorId  == 'Chuva')
                parsedEvent = 'usaChuva'

            parsedEvent += event == 'disableSensor' ? 'false' : 'true'

            return parsedEvent;
        }

        if(event == 'changeTreshold'){
            console.log(event)
            parsedEvent = 'limiar'
            if('sensorId' in data && data.sensorId  == 'Temperatura')
                parsedEvent += 'Temperatura'

            if('sensorId' in data && data.sensorId  == 'Umidade do Solo')
                parsedEvent += 'UmidadeDoSolo'

            if('sensorId' in data && data.sensorId  == 'Umidade do Ar')
                parsedEvent += 'UmidadeDoAr'

            return parsedEvent;
        }

        if(event == 'startIrrigation' || event == 'stopIrrigation')
            return 'irrigar' + event == 'startIrrigation' ? 'true' : 'false'

        throw new Error('Evento não reconhecido.');
    }

    const getDevice = (macAddress: string) => {
        return devices[macAddress];
    }

    const updateDevice = (device: DeviceData) => {
        setDevices({...devices, [device.macAddress]: device});
    }

    

    return (
        <DevicesContext.Provider value={
            {
                devices,
                fetchDevices,
                isSearching,
                bluetoothApi,
                setBluetoothStatus,
                getDevice,
                updateDevice,
                sendMessage
            }
        }>
            {children}
        </DevicesContext.Provider>
    );
};
