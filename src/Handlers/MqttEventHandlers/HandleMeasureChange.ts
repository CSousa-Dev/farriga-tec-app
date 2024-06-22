import { DeviceData } from "../../services/Account/AccountDevicesService";
import { DeviceEventHandlerInterface } from "./DeviceEventHandlerInterface";

export function HandleMeasureChange({topic, message, device, updateDevice}: DeviceEventHandlerInterface) {
    // const splitTopic = topic.split('/');
    // if(splitTopic.length < 2) return; // No matched topic
    // const zone = splitTopic[1];
    // const sensorId = splitTopic[2];
    // const sensorEventType = splitTopic[3];
    const splitTopic = topic.split('/');
    const zone = 0;
    const sensorId = {
        'temperatura': 1,
        'umidadeDoAr': 2,
        'umidadeDoSolo': 3,
        'chuva': 4,
    };
    const sensorEventType = splitTopic[1];
    
    if(splitTopic.length > 2) return; // No matched topic

    if(sensorEventType != 'temperatura' && sensorEventType != 'umidadeDoAr' && sensorEventType != 'umidadeDoSolo' &&  sensorEventType != 'chuva') return; // Not a measure
    
    const addNewMeasureToDevice = (device: DeviceData, zonePosition: number, sensorId: number, measure: boolean | number) => {
        const sensors = device.zones[zonePosition].sensors;

        const updatedSensors = sensors.map(sensor => {
            if(sensor.position == sensorId) {
                sensor.lastMeasure = {
                    value: measure,
                    measuredAt: new Date()
                }
            }
            return sensor;
        })
        device.zones[zonePosition].sensors = updatedSensors;
        device.lastReceivedEvent = new Date();
        const updatedDevice = device
        console.log(updatedDevice, 'updatedDevice')
        return updatedDevice;
    }

    const measureValue = message === 'true' ? true : message === 'false' ? false : parseFloat(message);
    const updatedDevice = addNewMeasureToDevice(device, Number(zone), sensorId[sensorEventType], measureValue);
    updateDevice(updatedDevice);
}
