import axios, { AxiosError, AxiosInstance } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Interceptors {
    notConfirmedEmail: number | null;
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
            baseURL: 'http://192.168.15.45:8000/api/',
            headers: {
                'Accept': 'application/json'
            }
        });

        this.interceptor = {
            notConfirmedEmail: null
        }
    }

    setInterceptors(navigation: NativeStackNavigationProp<any, any>): ApiInterface {
        this.setEmailNotValidInterceptor(navigation);
        return this;
    }

    setEmailNotValidInterceptor(navigation: NativeStackNavigationProp<any, any>) {
        this.interceptor.notConfirmedEmail = this.axiosInstance.interceptors.response.use(response => response, function (error: AxiosError) {

            if(error.response?.status === 401) {
                navigation.navigate('EmailConfirmation');
            }
        })
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