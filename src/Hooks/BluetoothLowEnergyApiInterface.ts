import { Device } from "react-native-ble-plx";

export default interface BluetoothLowEnergyApiInterface {
    allDevices: Device[];
    allConnectedDevices: Device[];
    requestPermissions: () => Promise<boolean>;
    andoridEnableBluetooth: () => boolean;
    stopScan: () => void;
    isBlutoothEnabled: () => Promise<boolean>;
    scanUntilFindDevice: (deviceMacAddress: string) => void;
    isFoundDevice: (deviceMacAddress: string) => boolean;
    connectToDevice: (macAddress: string) => Promise<boolean>;
    disconnectDevice: (macAddress: string) => Promise<boolean>;
    isConnectedDevice: (macAddress: string) => Promise<boolean>;
    sendCommandToDevice: (macAddress: string, command: string) => void;
}