import { DeviceData } from "../../services/Account/AccountDevicesService";

export interface DeviceEventHandlerInterface {
    topic: string;
    message: string;
    device: DeviceData;
    updateDevice: (device: DeviceData) => void;
}