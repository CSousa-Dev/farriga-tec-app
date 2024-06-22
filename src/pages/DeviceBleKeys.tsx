import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Input from "../components/Form/Input/Input";
import Button from "../components/Form/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeviceBleKeys({ navigation }: { navigation: NativeStackNavigationProp<any , 'DeviceBleKeys'> })
{
    const [resetar, setResetar] = useState<string>('')
    const [limiarUmidadeDoSolo, setLimiarUmidadeDoSolo] = useState<string>('')
    const [limiarUmidadeDoAr, setLimiarUmidadeDoAr] = useState<string>('')
    const [limiarTemperatura, setLimiarTemperatura] = useState<string>('')
    const [habilitarSensorChuva, setHabilitarSensorChuva] = useState<string>('')
    const [desabilitarSensorChuva, setDesabilitarSensorChuva] = useState<string>('')
    const [habilitarSensorUmidadeDoAr, setHabilitarSensorUmidadeDoAr] = useState<string>('')
    const [desabilitarSensorUmidadeDoAr, setDesabilitarSensorUmidadeDoAr] = useState<string>('')
    const [habilitarSensorTemperatura, setHabilitarSensorTemperatura] = useState<string>('')
    const [desabilitarSensorTemperatura, setDesabilitarSensorTemperatura] = useState<string>('')
    const [habilitarSensorUmidadeDoSolo, setHabilitarSensorUmidadeDoSolo] = useState<string>('')
    const [desabilitarSensorUmidadeDoSolo, setDesabilitarSensorUmidadeDoSolo] = useState<string>('')
    const [iniciarIrrigacao, setIniciarIrrigacao] = useState<string>('')
    const [pararIrrigacao, setPararIrrigacao] = useState<string>('')

    const saveOnAsyncStorage = async () => {
        await AsyncStorage.setItem('reset', resetar)
        await AsyncStorage.setItem('limiarUmidadeDoSolo', limiarUmidadeDoSolo)
        await AsyncStorage.setItem('limiarUmidadeDoAr', limiarUmidadeDoAr)
        await AsyncStorage.setItem('limiarTemperatura', limiarTemperatura)
        await AsyncStorage.setItem('usaSensorChuvatrue', habilitarSensorChuva)
        await AsyncStorage.setItem('usaSensorChuvafalse', desabilitarSensorChuva)
        await AsyncStorage.setItem('usaSensorUmidadeDoArtrue', habilitarSensorUmidadeDoAr)
        await AsyncStorage.setItem('usaSensorUmidadeDoArfalse', desabilitarSensorUmidadeDoAr)
        await AsyncStorage.setItem('usaSensorTemperaturatrue', habilitarSensorTemperatura)
        await AsyncStorage.setItem('usaSensorTemperaturafalse', desabilitarSensorTemperatura)
        await AsyncStorage.setItem('usaSensorUmidadeDoSolotrue', habilitarSensorUmidadeDoSolo)
        await AsyncStorage.setItem('usaSensorUmidadeDoSolofalse', desabilitarSensorUmidadeDoSolo)
        await AsyncStorage.setItem('irrigartrue', iniciarIrrigacao)
        await AsyncStorage.setItem('irrigarfalse', pararIrrigacao)
    }

    const getOnAsyncStorage = async () => {
        const reset = await AsyncStorage.getItem('reset')
        const limiarUmidadeDoSolo = await AsyncStorage.getItem('limiarUmidadeDoSolo')
        const limiarUmidadeDoAr = await AsyncStorage.getItem('limiarUmidadeDoAr')
        const limiarTemperatura = await AsyncStorage.getItem('limiarTemperatura')
        const usaSensorChuvatrue = await AsyncStorage.getItem('usaSensorChuvatrue')
        const usaSensorChuvafalse = await AsyncStorage.getItem('usaSensorChuvafalse')
        const usaSensorUmidadeDoArtrue = await AsyncStorage.getItem('usaSensorUmidadeDoArtrue')
        const usaSensorUmidadeDoArfalse = await AsyncStorage.getItem('usaSensorUmidadeDoArfalse')
        const usaSensorTemperaturatrue = await AsyncStorage.getItem('usaSensorTemperaturatrue')
        const usaSensorTemperaturafalse = await AsyncStorage.getItem('usaSensorTemperaturafalse')
        const usaSensorUmidadeDoSolotrue = await AsyncStorage.getItem('usaSensorUmidadeDoSolotrue')
        const usaSensorUmidadeDoSolofalse = await AsyncStorage.getItem('usaSensorUmidadeDoSolofalse')
        const irrigartrue = await AsyncStorage.getItem('irrigartrue')
        const irrigarfalse = await AsyncStorage.getItem('irrigarfalse')
        setResetar(reset || '')
        setLimiarUmidadeDoSolo(limiarUmidadeDoSolo || '')
        setLimiarUmidadeDoAr(limiarUmidadeDoAr || '')
        setLimiarTemperatura(limiarTemperatura || '')
        setHabilitarSensorChuva(usaSensorChuvatrue || '')
        setDesabilitarSensorChuva(usaSensorChuvafalse || '')
        setHabilitarSensorUmidadeDoAr(usaSensorUmidadeDoArtrue || '')
        setDesabilitarSensorUmidadeDoAr(usaSensorUmidadeDoArfalse || '')
        setHabilitarSensorTemperatura(usaSensorTemperaturatrue || '')
        setDesabilitarSensorTemperatura(usaSensorTemperaturafalse || '')
        setHabilitarSensorUmidadeDoSolo(usaSensorUmidadeDoSolotrue || '')
        setDesabilitarSensorUmidadeDoSolo(usaSensorUmidadeDoSolofalse || '')
        setIniciarIrrigacao(irrigartrue || '')
        setPararIrrigacao(irrigarfalse || '')
    }

    useEffect(() => {
        getOnAsyncStorage()
    },[])

    const handleSave = async () => {
        await saveOnAsyncStorage()
        navigation.goBack()
    }


    return (
        <ScrollView>
            <View style={{padding: 36, paddingTop: 62, gap: 8}}>
            <Text style={{fontSize: 16, textAlign:"center", marginBottom: 16}}>Bem vindo a tela secreta de configuração de eventos bluetooth.</Text>
            <Text style={{fontSize: 14, color: '#666', textAlign: 'center'}}>Informe o nome do evento no campo correspondente e salve para aplicar as alterações.</Text>
            <Input
                placeholder="Nome do evento"
                label="Resetar"
                value={resetar}
                onChange={(text) => setResetar(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Limiar Umidade Do Solo"
                value={limiarUmidadeDoSolo}
                onChange={(text) => setLimiarUmidadeDoSolo(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Limiar Umidade Do Ar"
                value={limiarUmidadeDoAr}
                onChange={(text) => setLimiarUmidadeDoAr(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Limiar Temperatura"
                value={limiarTemperatura}
                onChange={(text) => setLimiarTemperatura(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Habilitar Sensor Chuva"
                value={habilitarSensorChuva}
                onChange={(text) => setHabilitarSensorChuva(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Desabilitar Sensor Chuva"
                value={desabilitarSensorChuva}
                onChange={(text) => setDesabilitarSensorChuva(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Habilitar Sensor Umidade Do Ar"
                value={habilitarSensorUmidadeDoAr}
                onChange={(text) => setHabilitarSensorUmidadeDoAr(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Desabilitar Sensor Umidade Do Ar"
                value={desabilitarSensorUmidadeDoAr}
                onChange={(text) => setDesabilitarSensorUmidadeDoAr(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Habilitar Sensor Temperatura"
                value={habilitarSensorTemperatura}
                onChange={(text) => setHabilitarSensorTemperatura(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Desabilitar Sensor Temperatura"
                value={desabilitarSensorTemperatura}
                onChange={(text) => setDesabilitarSensorTemperatura(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Habilitar Sensor Umidade Do Solo"
                value={habilitarSensorUmidadeDoSolo}
                onChange={(text) => setHabilitarSensorUmidadeDoSolo(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Desabilitar Sensor Umidade Do Solo"
                value={desabilitarSensorUmidadeDoSolo}
                onChange={(text) => setDesabilitarSensorUmidadeDoSolo(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Iniciar irrigacao"
                value={iniciarIrrigacao}
                onChange={(text) => setIniciarIrrigacao(text)}
            />
            <Input
                placeholder="Nome do evento"
                label="Parar irrigacao"
                value={pararIrrigacao}
                onChange={(text) => setPararIrrigacao(text)}
            />
                <Button text="Salvar" onPress={async () => handleSave()}/>
                <Button text="Cancelar" onPress={() => navigation.goBack()} type='outlined'/>
            </View>
        </ScrollView>
    );
}