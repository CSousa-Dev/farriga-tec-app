import React, { createContext, ReactNode, useMemo, useState } from 'react';
import AccountDevicesService, { DeviceData } from '../services/Account/AccountDevicesService';
import useBLE from '../Hooks/useBle';
import BluetoothLowEnergyApiInterface from '../Hooks/BluetoothLowEnergyApiInterface';

export const DevicesContext = createContext({
    devices: {} as {[macAddress: string]: DeviceData},
    fetchDevices: async () => {},
    isSearching: false,
    bluetoothApi: {} as BluetoothLowEnergyApiInterface,
    setBluetoothStatus: (macAddress: string, status: boolean) => {}
});

export const DevicesProvider = ({children} : { children: ReactNode}) => {
    const bluetoothApi = useBLE();
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

    const setBluetoothStatus = (macAddress: string, status: boolean) => {
        let device = devices[macAddress];
        if(device){
            device.bluetoothOn = status;
            setDevices({...devices, [macAddress]: device});
        }
    }

    return (
        <DevicesContext.Provider value={
            {
                devices,
                fetchDevices,
                isSearching,
                bluetoothApi,
                setBluetoothStatus
            }
        }>
            {children}
        </DevicesContext.Provider>
    );
};
