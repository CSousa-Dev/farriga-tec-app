import { useEventEmitter } from "../../Hooks/useEventEmitter";
import { DeviceData } from "../../services/Account/AccountDevicesService";
import { DeviceEventHandlerInterface } from "./DeviceEventHandlerInterface";
import { HandleIrrigationStartStop } from "./HandleIrrigationStartStop";
import { HandleIrrigationStatus } from "./HandleIrrigationStatus";
import { HandleMeasureChange } from "./HandleMeasureChange";
import { HandleSensorStatus } from "./HandleSensorStatus";

export function MqttMainHandler(
    allDevices: DeviceData[],
    updateDevice: (device: DeviceData) => void
) {
    const { useEventListener } = useEventEmitter();

    const extractDeviceMacAddress = (topic: string) => {
        const macAddress = topic.split('/')[0];
        return macAddress;
    }

    useEventListener('receiveMessage', (data) => {
        console.log('data')
    
        if(!extractDeviceMacAddress(data.topic)) return;
        const device = chekcIsDeviceEvent(data.topic);
        if(!device) return;

        console.log('Device event:', data.topic, data.message)

        deviceEventHandlers.forEach(handler => {
            handler({
                topic: data.topic,
                message: data.message,
                device: device,
                updateDevice: updateDevice
            });
        });

    });

    const chekcIsDeviceEvent = (topic: string) : DeviceData | undefined => {
        const macAddress = extractDeviceMacAddress(topic);
        const device = allDevices.find(device => device.macAddress === macAddress);
        return device;
    }

    const deviceEventHandlers: (({ topic, message, device, updateDevice }: DeviceEventHandlerInterface) => void)[] = [
        HandleMeasureChange,
        HandleIrrigationStartStop,
        HandleIrrigationStatus,
        HandleSensorStatus
    ];

}