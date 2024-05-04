import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text,  View, TextStyle, NativeSyntheticEvent, TextInputKeyPressEventData,  TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export default function Input(props: InputProps) {
    const [value, setValue] = useState(props?.initialValue || '');
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    let initialDate = null;
    if(props.type === 'date' && props.initialValue) {
        let date = new Date(props.initialValue);
        initialDate = new Date(date.setDate(date.getDate() + 1));
    }

    const [date, setDate] = useState(initialDate ? initialDate : new Date());

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');  
        const day = String(selectedDate.getDate()).padStart(2, '0');

        const formatedDate = `${year}-${month}-${day}`;
        props.onChange && props.onChange(formatedDate);
        setValue(formatedDate);

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

    props.type = props.type || 'text';

    function applyFormat(value: string, format: string): string {
        let regex = props.type === 'numeric' ? /\D/g : /\W/g;
        
        let clearedValue = value.replace(regex, '');
        let result = '';
        let valueIndex = 0;
      
        for (let i = 0; i < format.length; i++) {
          if (format[i] === '#') {

            if(clearedValue[valueIndex] === undefined) return result;

            result += clearedValue[valueIndex] || '';
            valueIndex++;
          } else {
            result += format[i]; // Aqui estava result += result[i];
          }
        }
      
        return result;
    }


    function handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
        let currentValue = value;

        if (event.nativeEvent.key === 'Backspace') {
            currentValue = currentValue.slice(0, currentValue.length - 1);
            
            props.onChange && props.onChange(currentValue);
            setValue(currentValue);
            return;
        }

        if(props.format !== undefined){
            currentValue = applyFormat(currentValue + event.nativeEvent.key, props.format)
            props.onChange && props.onChange(currentValue);
            setValue(currentValue);
            return;
        }
        currentValue = currentValue + event.nativeEvent.key;
        props.onChange && props.onChange(currentValue);
        setValue(currentValue);

    }

    let DateInput = () => {
        return (
            <TouchableOpacity
                onPress={() => showDatepicker()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <View>
                    {
                        date.toLocaleDateString() == (new Date()).toLocaleDateString() ?
                        <Text 
                            style={{...styles.input, ...props?.inputStyle, ...(isFocused ? styles.inputFocused : {}), color: '#5f5f5f'}
                        }>{props.placeholder}</Text> 
                        : 
                        <Text
                            style={{...styles.input, ...props?.inputStyle, ...(isFocused ? styles.inputFocused : {})}
                        }
                        >{date.toLocaleDateString()}</Text>    
                    }
                </View>
            </TouchableOpacity>
        )
    }

    function handleSetVisible($visible: boolean){
        setVisible($visible);
    }


    return (
        <View style={{...styles.container, ...props?.containerStyle}}>
            {props.label ? 
                <Text style={{...styles.label, ...props?.labelStyle}}>{props.label}
                </Text> : null}

            {props.type === 'date' && <DateInput/>} 
            {( props.type === 'text' || props.type === undefined|| props.type === 'numeric') && 
            <View>
                {visible && props.password && <Entypo onPress={() => handleSetVisible(false)} name="eye" size={24} color="#003f07" style={{position: 'absolute', right: 12, top: 16, zIndex:999}} />}

                {!visible &&  props.password && <Entypo onPress={() => handleSetVisible(true)} name="eye-with-line" size={24} color="#003f07" style={{position: 'absolute', right: 12, top: 16,zIndex:999}} />} 
                <TextInput    
                    value={value}     
                    secureTextEntry={props.password && !visible}
                    placeholderTextColor="#5f5f5f" 
                    style={{...styles.input, ...props?.inputStyle, ...(isFocused ? styles.inputFocused : {})}}
                    placeholder={props.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    blurOnSubmit={false}
                    onKeyPress={(e) => handleKeyPress(e)}
                    keyboardType={props.type == 'numeric' ? 'numeric' : 'default'}
                />
            </View> 
            }
            {props.validationErrors?.map((error, index) => (
                <Text key={index} style={{color: '#ca0000', fontSize: 14}}>{error}</Text>
            ))}
        </View>
    )
}

interface InputProps {
    placeholder: string
    label?: string
    labelStyle?: TextStyle
    inputStyle?: TextStyle
    containerStyle?: TextStyle
    password?: boolean,
    format?: string 
    type?: 'numeric' | 'text' | 'date'
    onChange?: (text: string) => void    
    initialValue?: string,
    validationErrors?: string[]
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#0f9e2030',
        borderRadius: 4,
        paddingVertical: 14,
        paddingLeft: 16,
        marginBottom: 1,
        fontSize: 16
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#0f9e20'
    },
    container: {
        width: '100%',
        maxHeight: '100%',
        marginBottom: 1
    },
    inputFocused: {
        borderColor: '#0f9e20', // Altera a cor da borda quando o componente está focado
        borderWidth: 1
    }
})