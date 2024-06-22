import { DeviceData } from "../../services/Account/AccountDevicesService";
import { DeviceEventHandlerInterface } from "./DeviceEventHandlerInterface";

export function HandleSensorStatus({topic, message, device, updateDevice}: DeviceEventHandlerInterface) {
    const splitTopic = topic.split('/');
    if(splitTopic.length < 2) return; // No matched topic
    const sensorId = topic.split('/')[1];
    const eventType = topic.split('/')[2];
    const sensorEventType = topic.split('/')[3];
    if(eventType != 'sensor') return; // Not a sensor event
    if(sensorEventType != 'status') return; // Not a status event

    console.log(message);
}
