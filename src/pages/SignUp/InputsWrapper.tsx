import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { StepObjectInterface } from './Steps/StepObjectInterface';
import Input from '../../components/Form/Input/Input';
import { InputType } from './Steps/InputType';

interface InputWrapperProps {
    inputChangeHandler: (value: string, index: number) => void;
    currentErrors: Record<string, string[]>
    inputs: InputType[]
}

const InputsWrapper = (props: InputWrapperProps) => {
    const maxHeight = Dimensions.get('window').height * 0.4;
    const handleChangeInput = (text: string, index: number) => {
        props.inputChangeHandler(text, index);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ maxHeight, overflow: 'hidden' }}
                showsVerticalScrollIndicator={true}
            >
                {props.inputs.map((input, index) => (
                    <Input 
                        value={input.value}
                        keyboardType={input.keyboardType}
                        format={input.format}
                        key={index + input.field}
                        label={input.label} 
                        type={input.type || 'text'}
                        placeholder={input.placeholder} 
                        onChange={(text) => handleChangeInput(text, index)}
                        containerStyle={{
                            width: '85%',
                            marginBottom: 8,
                            alignSelf: 'center'
                        }}
                        validationErrors={props.currentErrors[input.field] || []}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default InputsWrapper;
