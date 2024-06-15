import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { Feather } from '@expo/vector-icons';

interface BluetoothButtonProps {
    onClick: () => void;
    on: boolean;
}

export default function BluetoothButton({ onClick, on }: BluetoothButtonProps) {
    return (
        <TouchableHighlight underlayColor={'#007914'} onPress={onClick} style={{ borderRadius: 16, height: 60 }}>
            <View style={{ backgroundColor: '#ffffff', height: 60, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 16, gap: 2, elevation: 32 }}>
                <Text style={{ width: '100%', textAlign: "center", fontSize: 12, color: on ? '#141f80' : '#666' }} >{on ? 'Ativo' : 'Inativo'}</Text>
                <Feather name="bluetooth" size={20} color={on ? "#141f80" : '#666'} />
            </View>
        </TouchableHighlight>
    )
}