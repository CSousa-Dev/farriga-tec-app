import React from "react";
import HandleDeviceOnOff from "./Device/HandleDeviceOnOff";
import HandleSensorOnOff from "./Sensor/HandleSensorOnOff";
import HandleIrrigationStartStop from "./Irrigator/HandleIrrigationStartStop";

export default function AllHandlersModals(){
    return (
        <>
        <HandleDeviceOnOff/>
        <HandleSensorOnOff/>
        <HandleIrrigationStartStop/>
        </>
    )
}