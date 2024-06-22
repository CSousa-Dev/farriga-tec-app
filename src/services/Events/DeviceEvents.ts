export type DeviceEventType = 'powerOffDevice' | 'powerOnDevice' | 'deviceReset';

export interface DeviceEventData {
    powerOffDevice: PowerOffDeviceEventData;
    powerOnDevice: PowerOnDeviceEventData;
    deviceReset: ResetDeviceEventData;
}

export interface PowerOffDeviceEventData {  
    macAddress: string;
}

export interface PowerOnDeviceEventData {  
    macAddress: string;
}

export interface ResetDeviceEventData {
    macAddress: string;
}