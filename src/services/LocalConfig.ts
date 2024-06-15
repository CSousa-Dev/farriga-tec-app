import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';

async function saveConfig(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving config:', error);
    }
}

async function loadConfig(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

async function enableBiometricAuth(email: string) {
    await saveConfig(email + '-biometricAuth', true);

}

async function disableBiometricAuth(email: string) {
    await saveConfig(email + '-biometricAuth', false);
}

async function enableDontAskBiometricAuth(email: string) {
    return await loadConfig(email + '-dontAskbiometricAuth');
}

async function disableaDontAskBiometricAuth(email: string) {
    await saveConfig(email + '-dontAskbiometricAuth', true);
}

async function canAskBiometricAuth(email: string) {
    
    console.log('canAskBiometricAuth', await biometricAuthEnabled(email));
    if(await biometricAuthEnabled(email)) return false;

    const compatible = await LocalAuthentication.hasHardwareAsync();
    if(!compatible) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if(!enrolled) return false;


    const value = await loadConfig(email + '-dontAskbiometricAuth');

    if (value == null) {
        return true;
    }

    return !value;
}

async function biometricAuthEnabled(email: string) {
    const value = await loadConfig(email + '-biometricAuth');
    return value;
}

async function localAuthEnabled(email: string) {
    const value = await loadConfig(email + '-localAuth');
    return value;
}


const LocalConfig = {
    saveConfig,
    loadConfig,
    enableBiometricAuth,
    biometricAuthEnabled,
    localAuthEnabled,
    enableDontAskBiometricAuth,
    disableaDontAskBiometricAuth,
    canAskBiometricAuth,
    disableBiometricAuth,
}

export default LocalConfig;