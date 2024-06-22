import { DeviceData } from "../../services/Account/AccountDevicesService";
import { DeviceEventHandlerInterface } from "./DeviceEventHandlerInterface";

export function HandleIrrigationStartStop({topic, message, device, updateDevice}: DeviceEventHandlerInterface) {
    // const splitTopic = topic.split('/');
    // if(splitTopic.length < 2) return; // No matched topic
    // const zone = splitTopic[1];
    // const sensorId = splitTopic[2];
    // const sensorEventType = splitTopic[3];
    const splitTopic = topic.split('/');
    const zone = 0;
    const irrigationEvent = splitTopic[1];

    if(irrigationEvent != 'irrigando') return; // Not a measure

    const irrigationStopedAtIsLessThanIrrigationStartedAt = (irrigationStartedAt: Date, irrigationStopedAt: Date) => {
        return irrigationStopedAt.getTime() < irrigationStartedAt.getTime();
    }
    
    const addNewMeasureToDevice = (device: DeviceData, zonePosition: number, irrigatorId: number, status: boolean) => {
        const irrigators = device.zones[zonePosition].irrigators;

        const updatedIrrigators = irrigators.map(irrigator => {
            if(irrigator.position == irrigatorId) {
                irrigator.irrigating = status;
                irrigator.updatedAt = new Date();
            
                if(status && irrigator.irrigationStopedAt == null) {
                    irrigator.irrigationStartedAt = new Date();
                }

                if(status && irrigator.irrigationStopedAt && irrigator.irrigationStartedAt &&!irrigationStopedAtIsLessThanIrrigationStartedAt(irrigator.irrigationStartedAt, irrigator.irrigationStopedAt)){
                    irrigator.irrigationStopedAt = undefined;
                    irrigator.irrigationStartedAt = new Date();
                }

                if(!status && irrigator.irrigationStartedAt !== null && irrigator.irrigationStopedAt === null) {
                    irrigator.irrigationStopedAt = new Date();
                }
            }
            return irrigator;
        })

        device.zones[zonePosition].irrigators = updatedIrrigators;
        device.lastReceivedEvent = new Date();
        const updatedDevice = device
        console.log('atualizado')
        return updatedDevice;
    }

 

    const irrigating = message === 'true' ? true : message === 'false' && false
    const updatedDevice = addNewMeasureToDevice(device, Number(zone), 1, irrigating);
    updateDevice(updatedDevice);
}
