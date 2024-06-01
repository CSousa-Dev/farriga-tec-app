import AsyncStorage from "@react-native-async-storage/async-storage";

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

async function biometricAuthEnabled(email: string) {
    const value = await loadConfig(email + '@biometricAuth');
    return value;
}

async function localAuthEnabled(email: string) {
    const value = await loadConfig(email + '@localAuth');
    return value;
}


const LocalConfig = {
    saveConfig,
    loadConfig,
    biometricAuthEnabled,
    localAuthEnabled
}

export default LocalConfig;