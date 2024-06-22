import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../Api";
import AuthService from "../AuthService";
import CheckInternetConnection from "../CheckInternetConnection";

export interface DeviceData {
    macAddress: string;
    power: boolean;
    alias: string;
    model: string;
    status?: string;
    bluetoothOn?: boolean;
    actions: DeviceActions;
    configuredEvents: Event[]
    zones: Zone[];
    lastReceivedEvent?: Date;
}

interface DeviceActions {
    canPowerControll: boolean;
    canManualControll: boolean;
    useBluetooth: boolean;
    useWifi: boolean;
}

interface Event {
    canEmit: boolean;
    canNotify: boolean;
    eventName: string;
    listenKey: string;
    emitKey: string;
}

interface Zone {
    alias: string;
    position: number;
    sensors: Sensor[];
    irrigators: Irrigator[];
}

interface Sensor {
    position: number;
    name: string;
    alias: string;
    model: string;
    unit?: string;
    actions: SensorActions;
    configuredEvents: Event[];
    lastMeasure?: Measure;
}

interface Measure {
    value: number | boolean;
    measuredAt: Date;
}

interface SensorActions {
    canChangeTreshold: boolean;
    canChangeStartStop: boolean;
    tresholdType: boolean;
}

interface Irrigator {
    position: number;
    alias: string;
    model: string;
    actions: IrrigatorActions;
    configuredEvents: Event[];
    irrigating: boolean;
    irrigationStartedAt?: Date;
    irrigationStopedAt?: Date;
    updatedAt?: Date;
}

interface IrrigatorActions {
    canChangeWateringTime: boolean;
    canManualControllIrrigation: boolean;
    canChangeCheckInterval: boolean;
    canTurOnTurnOf: boolean;
}

async function getAll(): Promise<DeviceData[] | [] | undefined>
{

    if(await CheckInternetConnection() === false){
        let devices = await getDevicesFromStorage();
        return devices ? JSON.parse(devices) : [];
    }

    const api = new Api()
    const token = await AuthService.currentLoggedToken();
    try {
        const response = await api.addBearerToken(token ?? '').getInstance().get('account/device');
        
        const devices = response.data as DeviceData[] || [];

        await saveDevicesInLocalStorage(devices);
        return devices;
    }
    catch(e){
        console.log(e);
    }
}

async function saveDevicesInLocalStorage(devices: DeviceData[]){
    let currendLoggedEmail = await AuthService.lastLoggedEmail();
    if(currendLoggedEmail){
       await AsyncStorage.setItem(currendLoggedEmail + 'devices', JSON.stringify(devices));
    }
}

async function getDevicesFromStorage(){
    let currendLoggedEmail = await AuthService.lastLoggedEmail();
    if(currendLoggedEmail){
        let devices = await AsyncStorage.getItem(currendLoggedEmail + 'devices');
        return devices;
    }
    return null;
}

export async function link(macAddress: string){
    const api = new Api();
    const token = await AuthService.currentLoggedToken();

    try {
        const response = await api.addBearerToken(token ?? '').getInstance().post('account/device', {macAddress: macAddress})
        return response;
    }
    catch(e){
        throw e;
    }
}


export default { getAll, link, saveDevicesInLocalStorage}