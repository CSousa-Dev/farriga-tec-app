import React, { createContext, ReactNode, useState } from 'react';
import AccountDevicesService, { DeviceData } from '../services/Account/AccountDevicesService';
import { all } from 'axios';

export const DevicesContext = createContext({
    devices: {} as {[macAddress: string]: DeviceData},
    fetchDevices: async () => {},
    isSearching: false,
});

export const DevicesProvider = ({children} : { children: ReactNode}) => {
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

    return (
        <DevicesContext.Provider value={
            {
                devices,
                fetchDevices,
                isSearching
            }
        }>
            {children}
        </DevicesContext.Provider>
    );
};
