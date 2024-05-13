import Api  from "../Api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Credentials {
    username: string;
    password: string;
}

export interface Authorization {
    token: string;
    userIdentification: string;
}

export default async function login (credentials: Credentials, navigationRef: NativeStackNavigationProp<any, any>): Promise<Authorization | any> {
    const api = new Api();
    const response = await api.setInterceptors(navigationRef).getInstance().post('account/login', credentials)
    return response;
}