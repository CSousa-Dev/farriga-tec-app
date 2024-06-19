import { useEffect, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device, LogLevel } from "react-native-ble-plx";
import BluetoothLowEnergyApiInterface from "./BluetoothLowEnergyApiInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer';


function useBLE(): BluetoothLowEnergyApiInterface {
    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [allConnectedDevices, setAllConnectedDevices] = useState<Device[]>([]);

    useEffect(() => {
        syncConnectedDevices();
        console.log('sync')
    }, []);

    const syncConnectedDevices = async () => {
        const devices = await getConnectedDevices();
        setAllConnectedDevices(devices);
    }

    const persistConnectedDevices = async (Device: Device) => {
        try {
            const devices = await getConnectedDevices();   
            if(!devices.some((d: Device) => d.id === Device.id)) {
                devices.push(Device);
                await AsyncStorage.setItem('bluetoothConnectedDevices', JSON.stringify(devices));
            }
            syncConnectedDevices();
        } catch (error) {
            console.error(error);
        }     
    }

    const getConnectedDevices = async (): Promise<Device[]> => {
        const devices = await AsyncStorage.getItem('bluetoothConnectedDevices');
        return devices ? JSON.parse(devices) : [];;
    }

    const removeConnectedDevice = async (macAddress: string) => {
        const devices = await getConnectedDevices();
        const newDevices = devices.filter((d: Device) => d.name !== macAddress);
        await AsyncStorage.setItem('bluetoothConnectedDevices', JSON.stringify(newDevices));
        setAllConnectedDevices(newDevices);
    }

    const requestPermissions = async () => {
        if (Platform.OS === 'ios') {
          return true
        }

        if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
          const apiLevel = parseInt(Platform.Version.toString(), 10)
      
          if (apiLevel < 31) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            return granted === PermissionsAndroid.RESULTS.GRANTED
          }

          if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
            const result = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ])
      
            return (
                    result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
                )
            }
        }
            
        return false
    }

    const isDuplicatedDevice = (device: Device) => {
        return allDevices.some((d) => d.id === device.id);    
    }

    const isBlutoothEnabled = async () => {
        try {
            const state = await bleManager.state()
            return state === 'PoweredOn';
        } catch (error) {
            return false;
        }
    };

    const andoridEnableBluetooth = () => {
        try {
            if(Platform.OS === 'android') {
                bleManager.enable();
            }
            return true;
        } catch (error) {
            return false
        }
    };


    const scanUntilFindDevice = (deviceMacAddress: string) => {
        bleManager.setLogLevel(LogLevel.None);
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                return
            }

            if (device && device.name == deviceMacAddress) {
                if (!isDuplicatedDevice(device)) {
                    setAllDevices([...allDevices, device]);
                }
                return;
            }           
        });
    }

    const isFoundDevice = (deviceMacAddress: string) => {
        return allDevices.some((device) => device.name === deviceMacAddress);
    }

    const connectToDevice = async (macAddress: string) => {
        const device = allDevices.find((d) => d.name === macAddress);
        
        if(!device) {
            return false;
        }

        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();

            await persistConnectedDevices(device);
            return true;
        } catch (error) {
            return false;
        }       
    }

    const disconnectDevice = async (macAddress: string) => {
        const devices = await getConnectedDevices();
        const device = devices.find((d: Device) => d.name === macAddress);
        
        if(!device) {
            return false;
        }

        try {
            const disconnectDevice = await bleManager.cancelDeviceConnection(device.id);
            await removeConnectedDevice(macAddress);
            return true;
        } catch (error) {
            return false;
        }
    }

    const isConnectedDevice = async (macAddress: string) => {
        const devices = await getConnectedDevices();
        const device = devices.find((d: Device) => d.name === macAddress);

        if(device) {
            const isConnected = await bleManager.isDeviceConnected(device.id);
            if(!isConnected) {
                await removeConnectedDevice(macAddress);
                return false
            }

            return true;
        }

        return false;
    }

    const stopScan = () => {
        bleManager.stopDeviceScan();
    }

    const sendCommandToDevice = async (macAddress: string, command: string) => {
        console.log('send command to device', macAddress, command);

        try {
            const device = allConnectedDevices.find((d) => d.name === macAddress);
            if(!device) {
                return;
            }

            const commandBase64 = Buffer.from(command).toString('base64');
            console.log('device', commandBase64)
            await bleManager.writeCharacteristicWithoutResponseForDevice(device.id,          '12345678-1234-1234-1234-123456789012', // Substitua pelo UUID do serviço, se necessário
            '87654321-4321-4321-4321-210987654321', commandBase64)
    
          } catch (error) {
            console.error('Erro ao conectar ou enviar comando:', error);
          }
       
    }

    return {
        allDevices,
        allConnectedDevices,
        requestPermissions,
        andoridEnableBluetooth,
        stopScan,
        isBlutoothEnabled,
        scanUntilFindDevice,
        isFoundDevice,
        connectToDevice,
        isConnectedDevice,
        disconnectDevice,
        sendCommandToDevice
    }
}

export default useBLE;