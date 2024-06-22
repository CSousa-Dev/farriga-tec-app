import { DeviceData } from "../../services/Account/AccountDevicesService";
import { DeviceEventHandlerInterface } from "./DeviceEventHandlerInterface";

export function HandleIrrigationStatus({topic, message, device, updateDevice}:DeviceEventHandlerInterface) {
    const splitTopic = topic.split('/');
    if(splitTopic.length < 2) return; // No matched topic
    const irrigatorId = topic.split('/')[1];
    const eventType = topic.split('/')[2];
    const irrigatorEventType = topic.split('/')[3];
    if(eventType != 'irrigation') return; // Not a measure event
    if(irrigatorEventType != 'status') return; // Not a status event

    console.log(message, 'irrigation status');
}
