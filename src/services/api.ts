import axios, { AxiosError, AxiosInstance } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Interceptors {
    notConfirmedEmail: number | null;
    unauthorized: number | null;
}

interface ApiInterface {
    getInstance(): AxiosInstance;
    setInterceptors(navigation: NativeStackNavigationProp<any, any>): ApiInterface;
}

class Api implements ApiInterface {
    
    private axiosInstance: AxiosInstance;   
    private interceptor: Interceptors;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                'Accept': 'application/json'
            }
        });

        this.interceptor = {
            notConfirmedEmail: null,
            unauthorized: null
        }
    }

    setInterceptors(navigation: NativeStackNavigationProp<any, any>): ApiInterface {
        this.setEmailNotValidInterceptor(navigation);
        this.setUnauthorizedInterceptor(navigation);
        return this;
    }

    setEmailNotValidInterceptor(navigation: NativeStackNavigationProp<any, any>) {
        this.interceptor.notConfirmedEmail = this.axiosInstance.interceptors.response.use(
            response => response, 
            function (error: AxiosError) {
                if(error.response?.status === 40101) {
                    navigation.navigate('EmailConfirmation');
                }
                return Promise.reject(error); // Ensure error is propagated
            }
        );
    }

    setUnauthorizedInterceptor(navigation: NativeStackNavigationProp<any, any>) {
        this.interceptor.unauthorized = this.axiosInstance.interceptors.response.use(
            response => response, 
            function (error: AxiosError) {
                if(error.response?.status === 401) {
                    navigation.navigate('Login');
                }
                return Promise.reject(error); // Ensure error is propagated
            }
        );
    }

    addBearerToken(token: string) {
        this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
        return this;
    }

    removeAllInterceptors() {
        if(this.interceptor !== null && this.interceptor.notConfirmedEmail !== null) {
            this.axiosInstance.interceptors.response.eject(this.interceptor.notConfirmedEmail);
        }

        return this;
    }

    getInstance() {
        return this.axiosInstance;
    }
}

export default Api;
