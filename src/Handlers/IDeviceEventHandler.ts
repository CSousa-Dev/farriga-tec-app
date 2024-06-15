import { UserContextData } from "../Contexts/DevicesContext";

export interface IDeviceEventHandler  {
    UserContext: UserContextData
    return: (message: any) => void;
}