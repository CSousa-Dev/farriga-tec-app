import React, { useState } from 'react';
import { TextInput, Text,  View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { BaseInputStyle } from './BaseInputStyle';
import BaseInputProps from './BaseInputProps';

export default function Input(props: BaseInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    function handleSetVisible($visible: boolean){
        setVisible($visible);
    }

    return (
        <View style={{...BaseInputStyle.container, ...props?.containerStyle}}>
            {props.label && <Text style={BaseInputStyle.label}>{props.label}</Text>}
            <View>
                {visible && <Entypo onPress={() => handleSetVisible(false)} name="eye" size={24} color="#003f07" style={{position: 'absolute', right: 12, top: 16, zIndex:999}} />}

                {!visible && <Entypo onPress={() => handleSetVisible(true)} name="eye-with-line" size={24} color="#003f07" style={{position: 'absolute', right: 12, top: 16,zIndex:999}} />} 
                <TextInput    
                    value={props.value}     
                    secureTextEntry={!visible}
                    placeholderTextColor="#5f5f5f" 
                    style={{...BaseInputStyle.input, ...(isFocused ? BaseInputStyle.inputFocused : {})}}
                    placeholder={props.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    blurOnSubmit={false}
                    onChangeText={(e) => props.onChange && props.onChange(e)}
                    keyboardType={props.keyboardType}
                />
            </View>
            {props.validationErrors?.map((error, index) => (
                <Text key={index} style={{color: '#ca0000', fontSize: 14}}>{error}</Text>
            ))}
        </View>
    )
}