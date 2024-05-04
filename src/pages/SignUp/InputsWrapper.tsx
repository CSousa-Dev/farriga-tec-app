import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import Input from '../../components/Form/Input';
import { StepObjectInterface } from './Steps/StepObjectInterface';

interface InputWrapperProps {
    step: StepObjectInterface;
    dataChangeHandler: (value: string, index: number) => void;
    currentErrors: Record<string, string[]>
}

const InputsWrapper = (props: InputWrapperProps) => {
    const maxHeight = Dimensions.get('window').height * 0.4;
    const handleChangeInput = (text: string, index: number) => {
        props.dataChangeHandler(text, index);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ maxHeight, overflow: 'hidden' }}
                showsVerticalScrollIndicator={true}
            >
                {props.step.inputs().map((input, index) => (
                    <Input 
                        password={input.password}
                        initialValue={input.value}
                        format={input.format}
                        key={index + input.field}
                        label={input.label} 
                        type={input.type}
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
