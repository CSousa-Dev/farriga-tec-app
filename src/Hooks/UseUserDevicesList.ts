import { useState } from "react";

interface BluetoothConnection {
    isConnected: boolean;
    deviceName: string;
    devicePassword: string;
}

interface Sensor {
    id: number;
    name: string;
    type: string;
    status: boolean;
    model: string;
    lastUpdate: string;
    sensibility: number;
}

interface Device {
    id: number;
    name: string;
    type: string;
    status: boolean;
    model: string;
    bluetoothConnection: BluetoothConnection | null;
}

export const UseUserDevicesList = () => {
    const [devices, setDevices] = useState<Device[]>([]);

    const addDevice = (device: Device) => {
        setDevices([...devices, device]);
    }

    const removeDevice = (id: number) => {
        setDevices(devices.filter(device => device.id !== id));
    }

    const updateDevice = (device: Device) => {
        setDevices(devices.map(d => d.id === device.id ? device : d));
    }


}