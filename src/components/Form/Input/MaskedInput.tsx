import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Text,  View, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import BaseInputProps from './BaseInputProps';
import { BaseInputStyle } from './BaseInputStyle';

interface MaskedInputProps extends BaseInputProps {
    format: string;
}

export default function MaskedInput(props: MaskedInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [lastPressedKey, setLastPressedKey] = useState(''); 

    function applyFormat(value: string) {

        if(value == undefined) return '';

        let maskIndex = 0;
        let result = '';
    
        for (let i = 0; i < props.format.length; i++) {
            if (props.format[i] === '#' ) {
                if (maskIndex < value.length) {
                    result += value[maskIndex];
                    maskIndex++;
                } else {
                    break; // If we reached the end of the input
                }
            } else if (value[i] === '*') {
                result += value[maskIndex];
                maskIndex++;
            } else {
                result += props.format[i];
            }
        }

        if(lastPressedKey == "Backspace" && props.format[result.length - 1] !== "#" && props.format[result.length - 1] !== undefined){
            result = result.slice(0, -1)
        }
    
        return result;
    }

    const removeFormatSeparators = (value: string) => {
        let result = '';
        for (let i = 0; i < value.length; i++) {
            if (props.format[i] === '#') {
                result += value[i];
            }

            if(props.format[i] !== '#' && value[i] !== props.format[i])
                result += value[i]
        }
        return result;
    }


    function handleChange(text: string) {
        let currentValue = text;  

        if(currentValue == '' || currentValue == undefined)
            props.onChange && props.onChange(removeFormatSeparators(currentValue));


        if(currentValue.length === 0) {
            props.onChange && props.onChange('');
            return;
        }

        if(currentValue.length > props.format.length) return;
        props.onChange && props.onChange(removeFormatSeparators(currentValue));
    }


    return (
        <View style={{...BaseInputStyle.container, ...props?.containerStyle}}>
            {props.label && <Text style={BaseInputStyle.label}>{props.label}
            </Text>}           
            <View>
                <TextInput    
                    value={props.value && applyFormat(props.value) || ''}     
                    placeholderTextColor="#5f5f5f" 
                    style={{...BaseInputStyle.input, ...(isFocused ? BaseInputStyle.inputFocused : {})}}
                    placeholder={props.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    blurOnSubmit={false}
                    onKeyPress={(e) => setLastPressedKey(e.nativeEvent.key)}
                    onChangeText={(text) => handleChange(text)}
                    keyboardType={props.keyboardType}
                />
            </View> 
            {props.validationErrors?.map((error, index) => (
                <Text key={index} style={{color: '#ca0000', fontSize: 14}}>{error}</Text>
            ))}
        </View>
    )
}