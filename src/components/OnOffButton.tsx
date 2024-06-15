import { View, Text, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";

export default function OnOffButton({onClick, on}:{onClick: () => void, on: boolean}) {
    return (
        <TouchableHighlight underlayColor={'#007914'} onPress={onClick} style={{borderRadius: 16, height: 60}}>
            <View style={{backgroundColor: '#ffffff', height: 60, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 16, gap:2, elevation:32}}>
                <Text style={{width: '100%', textAlign: "center", fontSize: 12, color: on? '#25572d' : '#ac0000'}} >{on ? 'On' : 'Off'}</Text>
                <FontAwesome name="power-off" size={20} color={on ? "#25572d" : '#ac0000'}/>
            </View>
        </TouchableHighlight>
    )
}   
