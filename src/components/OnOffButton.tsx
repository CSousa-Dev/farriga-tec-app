import { View, Text, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";

export default function OnOffButton({onClick, on, onText = 'On', offText = 'Off', width = 60, height = 60, fontSize = 12, noIcon = false}:{onClick: () => void, on: boolean, onText?: string, offText?: string, width?: number, height?: number, fontSize?: number, noIcon?: boolean}) {
    return (
        <TouchableHighlight underlayColor={'#007914'} onPress={onClick} style={{borderRadius: 16, height: height, width: width}}>
            <View style={{backgroundColor: '#ffffff', height: height, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, elevation:32, padding: 6}}>
                <Text style={{width: '100%', textAlign: "center", fontSize: fontSize, color: on? '#ac0000' : '#25572d'}} >{on ? onText : offText}</Text>
                {!noIcon && <FontAwesome name="power-off" size={20} color={on ? "#ac0000" : '#25572d'}/>}
            </View>
        </TouchableHighlight>
    )
}   
