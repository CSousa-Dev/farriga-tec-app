import { DeviceEventData, DeviceEventType } from "./DeviceEvents";
import { EventPopupData, EventPopupType } from "./EventPopup";
import { IrrigatorEventData, IrrigatorEventType } from "./IrrigatorEvents";
import { MqttEventData, MqttEventType } from "./MqttEvents";
import { SensorEventData, SensorEventType } from "./SensorEvents";

export type EventType = DeviceEventType | SensorEventType | IrrigatorEventType | EventPopupType | MqttEventType;
export type EventData = DeviceEventData & SensorEventData & IrrigatorEventData & EventPopupData & MqttEventData;