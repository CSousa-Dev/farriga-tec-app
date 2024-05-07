import React, { useState } from 'react';
import { TextInput as NativeTextInput, Text,  View } from 'react-native'
import BaseInputProps from './BaseInputProps';
import { BaseInputStyle } from './BaseInputStyle';

export default function TextInput(props: BaseInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{...BaseInputStyle.container, ...props?.containerStyle}}>
            {props.label && <Text style={BaseInputStyle.label}>{props.label}
            </Text>}           
            <View>
                <NativeTextInput   
                    value={props.value}     
                    placeholderTextColor="#5f5f5f" 
                    style={{...BaseInputStyle.input, ...(isFocused ? BaseInputStyle.inputFocused : {})}}
                    placeholder={props.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    blurOnSubmit={false}
                    onChangeText={(text) => props.onChange && props.onChange(text)}
                    keyboardType={props.keyboardType}
                />
            </View> 
            {props.validationErrors?.map((error, index) => (
                <Text key={index} style={{color: '#ca0000', fontSize: 14}}>{error}</Text>
            ))}
        </View>
    )
}
