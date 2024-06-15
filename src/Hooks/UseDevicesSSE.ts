import { useEffect } from 'react';
import EventSource from "react-native-sse";

export interface BaseEventMessage {
    type: 'open_connection' | 'stabilished_connection' | 'measurement' | 'treshold' | 'power' | 'irrigation' | 'irrigation_interval' | 'in_irrigation_time';
    timestamp: string;
}
     
export interface OpenConnectionEventMessage extends BaseEventMessage {
    type: 'open_connection';
    message: string;
}

export interface StabilishConnectionEventMessage extends BaseEventMessage {
    type: 'stabilished_connection';
    message: string;
}

export interface MeasurementEventMessage extends BaseEventMessage {
    type: 'measurement';
    macAddress: string;
    sensorId: number;
    value: number | string | boolean;
}

export interface TresholdEventMessage extends BaseEventMessage {
    type: 'treshold';
    macAddress: string;
    sensorId: number;
    value: number;
}

export interface PowerSensorEventMessage extends BaseEventMessage {
    type: 'power';
    macAddress: string;
    sensorId: number;
    value: boolean;
}

export interface IrrigationEventMessage extends BaseEventMessage {
    type: 'irrigation';
    macAddress: string;
    irrigatorId: number;
    value: boolean;
}

export interface IrrigationIntervalEventMessage extends BaseEventMessage {
    type: 'irrigation_interval';
    macAddress: string;
    irrigatorId: number;
    value: number;
}

export interface InIrrigationTimeEventMessage extends BaseEventMessage {
    type: 'in_irrigation_time';
    macAddress: string;
    irrigatorId: number;
    value: boolean;
}

export interface MessageHandlers {
    open_connection: (message: OpenConnectionEventMessage) => void;
    stabilished_connection: (message: StabilishConnectionEventMessage) => void;
    measurement: (message: MeasurementEventMessage) => void;
    treshold: (message: TresholdEventMessage) => void;
    power: (message: PowerSensorEventMessage) => void;
    irrigation: (message: IrrigationEventMessage) => void;
    irrigation_interval: (message: IrrigationIntervalEventMessage) => void;
    in_irrigation_time: (message: InIrrigationTimeEventMessage) => void;
}

const useSSE = (url: string, MessageHandlers: MessageHandlers) => {

    useEffect(() => {
        const eventSource = new EventSource('http://192.168.15.45:8000/api/irrigation/events');
            eventSource.addEventListener('open', (event: any) => {
                let data : OpenConnectionEventMessage = JSON.parse(event.data);
                handleEvent(data.type, data);
            })

            eventSource.addEventListener('message', (event: any) => {
                let data : BaseEventMessage = JSON.parse(event.data);

                if(!MessageHandlers[data.type]) {
                    console.error(`Event type ${data.type} not handled!`);
                    return;
                }

                handleEvent(data.type, data);
            })
            
            eventSource.addEventListener('close', (event: any) => {
                console.log('Connection closed');
            })

            eventSource.addEventListener('error', (event: any) => {
                console.error('Error:', event);
            })

        return () => {
            eventSource.close();
        };
    }, [url, MessageHandlers]);

    function handleEvent(eventType: BaseEventMessage['type'], message: any) {
        MessageHandlers[eventType](message);
    }
};

export default useSSE;
