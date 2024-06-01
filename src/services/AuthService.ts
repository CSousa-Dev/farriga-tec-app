import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';
import LocalConfig from './LocalConfig';
import Api from './Api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import CheckInternetConnection from './CheckInternetConnection';

export interface Credentials {
    email: string;
    password: string;
}

interface AuthResponse {
    tryBio?: boolean;
    success: boolean;
    message: string;
}


async function auth(credentials: Credentials, navigationRef: NativeStackNavigationProp<any, any>): Promise<AuthResponse> {
    let isOnline = await CheckInternetConnection();
    let response: AuthResponse = {
        success: false,
        message: 'Erro desconhecido.'
    };

    if(isOnline){
        response = await authApi(credentials, navigationRef);
    } 
    
    if(!isOnline){
        response = await offlineAuth(credentials);
    }

    if(response.success)
        await setLastLoggedEmail(credentials.email);
    

    return response;
}


async function authApi(credentials: Credentials, navigationRef: NativeStackNavigationProp<any, any>): Promise<AuthResponse> {
    const api = new Api();
    const response = await api.setInterceptors(navigationRef).getInstance().post('account/login', credentials)

    if(response.status == 200){
        let token = response.data.token;
        let biometricKey = response.data.biometricKey;
        await saveLogin(credentials.email, token, biometricKey);  
        await saveCredentialsForOffilineLogin(credentials.email, credentials.password);

        return {
            success: true,
            message: 'Autenticado com sucesso.'
        };
    }

    return {
        success: false,
        message: 'Credenciais inválidas.'
    };
}

async function authBiometricApi(email: string, biometricKey: string){
    let api = new Api();
    let response = await api.getInstance().post('account/login/biometric', {biometricKey});
    if(response.status == 200){
        let token = response.data.token;
        let newBioKey = response.data.biometricKey;
        await saveLogin(email, token, newBioKey);
    }
}

async function biometricAuth(email: string): Promise<AuthResponse> {
    if(!(await LocalConfig.biometricAuthEnabled(email))) return {
        tryBio: false,
        success: false,
        message: 'Biometria não configurada para o usuário informado.'
    };

    const compatible = await LocalAuthentication.hasHardwareAsync();
    if(!compatible) return {
        tryBio: false,
        success: false,
        message: 'Dispositivo não compatível com o uso de biometria.'
    };

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if(!enrolled) return {
        tryBio: false,
        success: false,
        message: 'Biometria não cadastrada no dispositivo. Realize a configuração da biometria no app e no dispositivo.'
    };

    const lastBiometricKey = await biometricKey(email);

    const isOnline = await CheckInternetConnection();

    if(!lastBiometricKey) return {
        tryBio: false,
        success: false,
        message: 'Chave de biometria não encontrada. Realize o login manualmente para recria-la.'
    };
    
    const result = await LocalAuthentication.authenticateAsync({

        promptMessage: 'Autentique-se para continuar',
        cancelLabel: 'Cancelar'
    });

    if(!result.success) return {
        tryBio: true,
        success: false,
        message: 'Falha na autenticação biométrica.'
    }

    if(!isOnline && !await LocalConfig.localAuthEnabled(email)) return {
        tryBio: true,
        success: false,
        message: 'A autenticação offline não está habilidata para esse usuário, faça o login quando estiver conectado a internet.'
    }

    if(result.success && isOnline)
        await authBiometricApi(email, lastBiometricKey);

    return {
        tryBio: true,
        success: true,
        message: 'Autenticado com sucesso.'
    };
}

async function offlineAuth(
    credentials: Credentials
): Promise<AuthResponse>{
    if(!(await LocalConfig.localAuthEnabled(credentials.email))) return {
        success: false,
        message: 'Credenciais inválidas.'
    };

    let emailHash = hash(credentials.email);
    let passwordHash = hash(credentials.password);
    let storedPassword = await SecureStore.getItemAsync('-offlineCredentials' + emailHash);
    if(storedPassword == passwordHash){
        return {
            success: true,
            message: 'Autenticado com sucesso.'
        };
    }
    return {
        success: false,
        message: 'Credenciais inválidas.'
    };
}

async function lastLoggedEmail(){
    return await SecureStore.getItemAsync('-lastLoggedEmail');
}

async function setLastLoggedEmail(email: string){
    await SecureStore.setItemAsync('-lastLoggedEmail', email);
}

async function token(email: string){
    let hashEmail = hash(email); 
    return await SecureStore.getItemAsync(hashEmail + '-token');
}

async function biometricKey(email: string){
    let emailHash = hash(email);
    return await SecureStore.getItemAsync(emailHash + '-biometricKey');
}

async function saveLogin(email: string, token: string, biometricKey: string){
    let emailHash = hash(email);
    await SecureStore.setItemAsync(emailHash + '-email', email);
    await SecureStore.setItemAsync(emailHash + '-token', token);
    await SecureStore.setItemAsync(emailHash + '-biometricKey', biometricKey);
}

async function saveCredentialsForOffilineLogin(
    email: string,
    password: string
){
    let emailHash = hash(email);
    let passwordHash = hash(password);
    await SecureStore.setItemAsync('-offlineCredentials' + emailHash, passwordHash);
}

async function eraseCredentialsForLocalLogin(email: string){
    let emailHash = hash(email);
    await SecureStore.deleteItemAsync('-credential' + emailHash);
}

function hash(value: string){
    return CryptoJS.SHA256(value).toString();
}

const AuthService = {
    lastLoggedEmail,
    token,
    biometricKey,
    auth,
    eraseCredentialsForLocalLogin,
    biometricAuth
}

export default AuthService;