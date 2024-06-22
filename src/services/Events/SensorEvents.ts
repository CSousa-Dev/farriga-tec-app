
export type SensorEventType = 'disableSensor' | 'enableSensor' | 'changeTreshold' | 'measureChange';

export interface SensorEventData {
    disableSensor: DesableSensorData;
    enableSensor: EnableSensorData;
    changeTreshold: ChangeThresholdData;
    measureChange: MeasureChangeData;
}

export interface DesableSensorData {
    macAddress: string;
    sensorId: string;
}

export interface EnableSensorData {
    macAddress: string;
    sensorId: string;
}

export interface ChangeThresholdData {
    macAddress: string;
    sensorId: string;
    threshold: number;
}

export interface MeasureChangeData {
    macAddress: string;
    sensorId: string;
    measure: number;
}