import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import FarrigaOneHeader from "./Models/FarrigaOne/FarrigaOneHeader";
import { DeviceData } from "../../services/Account/AccountDevicesService";
import CollapseButton from "../Form/CollapseButton";
import DeviceHeader from "./DeviceHeader";
import ZoneCard from "./ZoneCard";
import SensorMiniCard from "./Sensor/SensorMiniCard";
import SensorCard from "./Sensor/SensorCard";
import SlideHorizontal from "../Animation/SlideHorizontal";
import IrrigatorMiniCard from "./Irrigator/IrrigatorMiniCard";
import IrrigatorCard from "./Irrigator/IrrigatorCard";


interface DeviceProps {
    deviceData: DeviceData
}

export default function Device({deviceData}: DeviceProps) {
    const [colapse, setColapse] = useState(false);
    const [selectedZone, setSelectedZone] = useState(1);
    const [editingZoneAlias, setEditingZoneAlias] = useState<number | boolean>();
    const [blueTooth, setBlueTooth] = useState(false);
    const [power, setPower] = useState(false);

    const handleBluetooth = () => {
        setBlueTooth(!blueTooth);
    }

    const handleChangeSelectedZone = (zone: number) => {
        setSelectedZone(zone);
        setEditingZoneAlias(false);
    }

    const handleSaveNewZoneAlias = (zone: number, alias: string) => {
        console.log(zone, alias);
        setEditingZoneAlias(false);
    }

    const handlePower = () => {
        setPower(!power);
    }


    let colors = ['#045f18', '#1d722b', '#228d34','#1d4926'];
    return (
        <LinearGradient colors={colors} style={styles.wrapper}>
            <DeviceHeader
                macAddress={deviceData.macAddress}
                deviceAlias={deviceData.alias}
                deviceModel={deviceData.model}
                canControllPower={deviceData.actions.canPowerControll}
                canUseBluetooth={deviceData.actions.useBluetooth}
                status={deviceData.status}
                onBluetoothClick={handleBluetooth}
                onPowerClick={handlePower}
                bluetoothOn={blueTooth}
                powerOn={power}
            />
            <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:18, marginBottom: 8}}>Zonas: </Text>
            {deviceData.zones.length == 0 && <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:14, marginBottom: 8}}>Nenhuma zona configurada para este dispositivo</Text>}
            <FlatList
                data={deviceData.zones}
                style={{flex: 1, width: '80%', flexDirection: 'row', gap: 5, marginBottom: 12}}
                renderItem={({ item }
                ) => (
                <ZoneCard 
                    position={item.position} 
                    alias={item.alias} 
                    onPress={() => handleChangeSelectedZone(item.position)} 
                    selected={selectedZone == item.position} 
                    onEdit={() => setEditingZoneAlias(item.position)} 
                    editing={item.position == editingZoneAlias} 
                    onCancelEdit={() => setEditingZoneAlias(false)} 
                    onSave={(zone, alias) => handleSaveNewZoneAlias(zone, alias)}/>
                )}
                keyExtractor={item => item.position.toString()}
            />
            <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:18, marginBottom: 8}}>Sensores: </Text>
            {(deviceData.zones.filter(zone => zone.position == selectedZone)[0].sensors).length == 0 && <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:14, marginBottom: 8}}>Nenhum sensor configurado para zona selecionada</Text> }
            
            {!colapse &&
                <FlatList
                    data={deviceData.zones.filter(zone => zone.position == selectedZone)[0].sensors}
                    style={{flex: 1, width: '80%', flexDirection: 'row', gap: 5, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}
                    renderItem={({ item }
                    ) => (
                        <SensorMiniCard sensorModel={item.model} sensorName={item.name} currentMeasure={undefined}/>
                    )}
                        keyExtractor={item => item.position.toString()
                    }
                />
            }
            {colapse && 
                <FlatList
                data={deviceData.zones.filter(zone => zone.position == selectedZone)[0].sensors}
                style={{flex: 1, width: '80%'}}
                renderItem={({ item }
                ) => (
                    <SlideHorizontal delayDuration={item.position * 100}>
                        <SensorCard
                            name={item.name}
                            model={item.model}
                            canStartStop={item.actions.canChangeStartStop}
    
                            currentMeasure={undefined}
                            canChangeTreshold={item.actions.canChangeTreshold}
                            unit={item.unit}
                        />
                    </SlideHorizontal>
                )}
                    keyExtractor={item => item.position.toString()
                }
            />
            }

            <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:18, marginBottom: 8}}>Irrigadores: </Text>
            {(deviceData.zones.filter(zone => zone.position == selectedZone)[0].irrigators).length == 0 && <Text style={{color: '#ffffff', alignSelf: 'flex-start', paddingLeft: 32, fontSize:14, marginBottom: 8}}>Nenhum irrigador configurado para zona selecionada</Text> }
            
            {!colapse &&
                <FlatList
                    data={deviceData.zones.filter(zone => zone.position == selectedZone)[0].irrigators}
                    style={{flex: 1, width: '80%', flexDirection: 'row', gap: 5, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}
                    renderItem={({ item }
                    ) => (
                        <IrrigatorMiniCard alias={item.alias} currentActivity={'Irrigando'} position={item.position}/>
                    )}
                        keyExtractor={item => item.position.toString()
                    }
                />
            }

            {colapse && 
                <FlatList
                data={deviceData.zones.filter(zone => zone.position == selectedZone)[0].irrigators}
                style={{flex: 1, width: '80%'}}
                renderItem={({ item }
                ) => (
                    <SlideHorizontal delayDuration={item.position * 100}>
                        <IrrigatorCard alias={item.alias} currentActivity={'Irrigando'} position={item.position}/>
                    </SlideHorizontal>
                )}
                    keyExtractor={item => item.position.toString()
                }
            />}
            <CollapseButton onPress={() => setColapse(!colapse)} colapse={colapse}/>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 36,
        borderRadius: 12,
        elevation: 24,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fff7',
        overflow: 'scroll'
    },
})

