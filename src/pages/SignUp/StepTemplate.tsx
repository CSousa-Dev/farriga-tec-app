import { 
    Text,
    ImageBackground,
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    View, 
    Image, 
    StyleSheet 
} from "react-native";
import InputsWrapper from "./InputsWrapper";
import React, { ReactNode } from "react";
import { StepObjectInterface } from "./Steps/StepObjectInterface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface StepTemplatePropsInterface {
    navigation: NativeStackNavigationProp<any, 'SignUp'>,
    dataChangeHandler: (value: string, index: number) => void;
    currentStepNumber: number;
    title: string;
    description: string;
    errorMessage?: string;
    children: ReactNode;
    step?: StepObjectInterface;
    currentErrors: Record<string, string[]>;
}

export default function StepTemplate(props: StepTemplatePropsInterface){
    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Change null to 'padding'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajuste o valor conforme necessário
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <ImageBackground 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                    source={require('../../../assets/farm.jpg')} 
                >
                    <View style={baseStyles.container}>
                        <Image 
                            style={{
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                height: 50,
                                width: 100,
                                marginBottom: 16
                            }}
                            alt='logo Farrigatec' 
                            source={require('../../../assets/FarrigaTecLog.png')}
                        />
                        <Text style={{
                            alignSelf: 'center',
                            backgroundColor: '#0f9e20',
                            fontSize: 18,
                            width: 32,
                            height: 32,
                            lineHeight: 32,
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: 100,
                        }}>{props.currentStepNumber}</Text>
                        <Text style={formStyles.title}>{props.title}</Text>
                        <Text style={formStyles.description}>{props.description}</Text>
                        {props.step && <InputsWrapper step={props.step} dataChangeHandler={props.dataChangeHandler}
                            currentErrors={props.currentErrors}
                        />}
                        
                        {props.errorMessage !== undefined && props.step &&
                            <Text style={{color: 'red', textAlign: 'center', fontSize: 14}}>
                                {props.step.notFilledMessage}
                            </Text>
                        }
                        
                        {props.children}

                        <Text style={{textAlign: 'center', fontSize: 16, marginTop: 24}}>Já possui uma conta? <Text style={formStyles.ancor} onPress={() => props.navigation.navigate('Login')}>Acesse agora!</Text></Text>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const formStyles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        textAlign: 'center',
        marginVertical: 12,
        fontSize: 16,
        color: '#235818'
    },
    description: {
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 14,
        color: '#235818'
    },
    ancor: {
        color: '#0f9e20',
        textDecorationLine: 'underline'
    }
});

const baseStyles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 32,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.952)',
        minHeight: '85%'
    },
})
