import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text,Image, View } from "react-native";
import Button from "../components/Form/Button";
import SlideHorizontal from "../components/Animation/SlideHorizontal";
import FadeIn from "../components/Animation/FadeIn";
import { Ionicons } from '@expo/vector-icons';

export default function SuccessfullyLinkedNewDevice({navigation}:{navigation: NativeStackNavigationProp<any, 'SuccessfullyLinkedNewDevice'>}){
    return (
        <SlideHorizontal style={{flex:1, flexDirection: 'column', justifyContent: 'center', gap: 36, height:'100%', paddingVertical: 150, paddingHorizontal: 36, alignItems: 'center'}}>
            <FadeIn>
                <Text style={{textAlign: 'center', fontSize: 24, color: '#25572d', marginBottom: 16}}>Dispositivio vinculado com sucesso</Text>
                <Ionicons name="checkmark-done-circle-outline" size={100} color="#25572d" style={{marginHorizontal: 'auto'}} />
            </FadeIn>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#666'}}>Clique no botão abaixo para ir para sua lista de dispositivos</Text>
            <Button text="Ir para os meus dispositivos" onPress={() => navigation.navigate('Home')}/>
        </SlideHorizontal>
    )
}