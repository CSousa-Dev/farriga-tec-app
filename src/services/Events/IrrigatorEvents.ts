export type IrrigatorEventType = 'disableIrrigator' | 'enableIrrigator' | 'startIrrigation' | 'stopIrrigation' | 'changeIrrigationDuration' | 'irrigationFinished' | 'irrigatorStatus' | 'changeIrrigationInterval' | 'changeIrrigationCheckInterval';

export interface IrrigatorEventData {
    disableIrrigator: DisableIrrigatorData;
    enableIrrigator: EnableIrrigatorData;
    startIrrigation: StartIrrigationData;
    stopIrrigation: StopIrrigationData;
    changeIrrigationDuration: ChangeIrrigationDurationData;
    irrigationFinished: IrrigationFinishedData;
    irrigatorStatus: IrrigatorStatusData;
    changeIrrigationInterval: ChangeIrrigationIntervalData;
    changeIrrigationCheckInterval: ChangeIrrigationCheckIntervalData;
}

export interface DisableIrrigatorData {
    macAddress: string;
    irrigatorId: string;
}

export interface EnableIrrigatorData {
    macAddress: string;
    irrigatorId: string;
}

export interface StartIrrigationData {
    macAddress: string;
    irrigatorId: string;
}

export interface StopIrrigationData {
    macAddress: string;
    irrigatorId: string;
}

export interface ChangeIrrigationDurationData {
    macAddress: string;
    irrigatorId: string;
    duration: number;
}

export interface IrrigationFinishedData {
    macAddress: string;
    irrigatorId: string;
}

export interface IrrigatorStatusData {
    macAddress: string;
    irrigatorId: string;
    isIrrigating: boolean;
    currentDuration: number;
    currentInterval: number;
    currentCheckInterval: number;
    timeRemaining: number;
}

export interface ChangeIrrigationIntervalData {
    macAddress: string;
    irrigatorId: string;
    interval: number;
}

export interface ChangeIrrigationCheckIntervalData {
    macAddress: string;
    irrigatorId: string;
    checkInterval: number;
}