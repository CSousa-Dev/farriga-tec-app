import { View,Text, Pressable } from "react-native";
import BaseInputProps from "./BaseInputProps";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";

export default function Checkbox(props: BaseInputProps) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: "center", ...props?.containerStyle}}>
                <MaterialIcons name="done" size={20} color={props.checked ? '#fff' : 'transparent'} 
                style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    borderWidth: 1,
                    marginRight: 8,
                    padding: 2,
                    borderColor: '#007914',
                    backgroundColor: props.checked ? '#007914' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={props.onPress}
            />
            <Text style={{fontSize: 16, color: '#666', textAlign: 'left', ...props?.labelStyle}}>{props.label}</Text>
        </View>
    )
}