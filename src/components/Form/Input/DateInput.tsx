import React, { useState } from 'react';
import { Text,  View, TouchableOpacity } from 'react-native'
import { BaseInputStyle } from './BaseInputStyle';
import BaseInputProps from './BaseInputProps';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DateInput(props: BaseInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const [date, setDate] = useState(new Date());

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');  
        const day = String(selectedDate.getDate()).padStart(2, '0');

        const formatedDate = `${year}-${month}-${day}`;
        props.onChange && props.onChange(formatedDate);
    };
  
    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: onChangeDate,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
      showMode('date');
    };

    return (
        <View style={{...BaseInputStyle.container, ...props?.containerStyle}}>
            {props.label && <Text style={BaseInputStyle.label}>{props.label}
            </Text>} 
                <TouchableOpacity
                onPress={() => showDatepicker()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                >
                    <View>
                        <Text style={{...BaseInputStyle.input, ...(isFocused ? BaseInputStyle.inputFocused : {}), color: '#5f5f5f'}}>
                            {!props.value ? props.placeholder : date.toLocaleDateString()}
                        </Text>     
                    </View>
                </TouchableOpacity>           
            {props.validationErrors?.map((error, index) => (
                <Text key={index} style={{color: '#ca0000', fontSize: 14}}>{error}</Text>
            ))}
        </View>
    )
}