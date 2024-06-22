export type MqttEventType = 'receiveMessage'; 

export interface MqttEventData {
    receiveMessage: ReceiveMessageData;
}

export interface ReceiveMessageData {
    topic: string;
    message: string;
}