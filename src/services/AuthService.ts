import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';
import LocalConfig from './LocalConfig';
import Api from './Api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import CheckInternetConnection from './CheckInternetConnection';

export interface Credentials {
    username: string;
    password: string;
    appKey?: string;
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
        await setLastLoggedEmail(credentials.username);
    

    return response;
}


async function authApi(credentials: Credentials, navigationRef: NativeStackNavigationProp<any, any>): Promise<AuthResponse> {
    const api = new Api();
    const axiosInstance = api.setInterceptors(navigationRef).getInstance();
    try {
        let appKey = await SecureStore.getItemAsync('appKey');
        
        if(appKey){ 
            credentials.appKey = appKey;
        }

        const response = await axiosInstance.post('account/login', {
            username: credentials.username, password : credentials.password, appKey: credentials.appKey});
        if (response.status === 200) {
            let responseToken = response.data.token;
            let responseRefreshToken = response.data.refreshToken;
            await saveCredentialsForOfflineLogin(credentials.username, credentials.password);
            await saveLogin(credentials.username, responseToken, responseRefreshToken);

            return {
                success: true,
                message: 'Autenticado com sucesso.'
            };
        } 

        return {
            success: false,
            message: 'Credenciais inválidas.'
        };
        
        } catch (error: any) { 
            if(error.response && error.response.status == 401){
                return {
                    success: false,
                    message: 'Credenciais inválidas.'
                };
            }           
            return {
                success: false,
                message: 'Houve um erro inesperado, tente novamente mais tarde.'
        };
    }
}

async function authRefreshToken(email: string, refreshToken: string){
    let api = new Api();
    let response = await api.getInstance().post('account/login/biometric', {refreshToken});
    if(response.status == 200){
        let token = response.data.token;
        let refreshToken = response.data.refreshToken;
        await saveLogin(email, token, refreshToken);
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

    const lastRefreshToken = await refreshToken(email);

    const isOnline = await CheckInternetConnection();

    if(!lastRefreshToken) return {
        tryBio: false,
        success: false,
        message: 'Erro ao acessar o sistema pela biometria, faça login com usuário e senha novamente.'
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

    // if(result.success && isOnline)
    //     await authRefreshToken(email, lastRefreshToken);

    return {
        tryBio: true,
        success: true,
        message: 'Autenticado com sucesso.'
    };
}

async function offlineAuth(
    credentials: Credentials
): Promise<AuthResponse>{
    if(!(await LocalConfig.localAuthEnabled(credentials.username))) return {
        success: false,
        message: 'Autenticação offline não habilitada para ultima conta conetcada.'
    };

    let emailHash = hash(credentials.username);
    let passwordHash = hash(credentials.password);
    let storedPassword = await SecureStore.getItemAsync('-offlineCredentials' + emailHash);

    if(!storedPassword) return {
        success: false,
        message: 'Você não está conectado a internet e não há credenciais salvas para autenticação offline do e-mail informado.'
    }
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

async function currentLoggedToken(){
    let email = await lastLoggedEmail();
    if(!email) return '';
    return await token(email);

}

async function refreshToken(email: string){
    let emailHash = hash(email);
    return await SecureStore.getItemAsync(emailHash + '-refreshToken');
}

async function saveLogin(email: string, token: string, refreshToken: string){
    let emailHash = hash(email);

    await SecureStore.setItemAsync(emailHash + '-email', email);
    await SecureStore.setItemAsync(emailHash + '-token', token);
    await SecureStore.setItemAsync(emailHash + '-refreshToken', refreshToken);
}

async function saveCredentialsForOfflineLogin(
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
    currentLoggedToken,
    token,
    refreshToken,
    auth,
    eraseCredentialsForLocalLogin,
    biometricAuth
}

export default AuthService;