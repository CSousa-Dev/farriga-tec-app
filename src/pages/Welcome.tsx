import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, ImageBackground } from "react-native";
import Button from "../components/Form/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FadeIn from "../components/Animation/FadeIn";
import SlideHorizontal from "../components/Animation/SlideHorizontal";
import React from "react";

export default function Welcome({ navigation }: { navigation: NativeStackNavigationProp<any, 'Login'> })
{
    return (
    <SlideHorizontal style={{flex: 1}}>
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Change null to 'padding'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajuste o valor conforme necessário
        >   
            <ImageBackground 
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
                source={require('../../assets/farm.jpg')} 
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
                        source={require('../../assets/FarrigaTecLog.png')}
                    />
                    <Text style={{textAlign: 'center', fontSize: 32, color: '#25572d', marginBottom: 16}}>Parabéns!</Text>
                    <Text style={{textAlign: 'center', fontSize: 18, color: '#25572d'}}>Você concluiu o cadastro com sucesso!</Text>
                    <Text style={{textAlign: 'center', fontSize: 18, color: '#25572d'}}>Faça login para continuar...</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 16 }}>
                        <FadeIn duration={1200}>
                            <Image source={require('../../assets/Festa.png')} style={{width: 180, height: 160}} resizeMode="contain"/>
                        </FadeIn>
                        <FadeIn duration={1200}>
                            <Image source={require('../../assets/Festa.png')} style={{width: 180, height: 160, transform: [{ scaleX: -1 }]}} resizeMode="contain"/>
                        </FadeIn>
                    </View>
                    <Button text="Fazer Login" onPress={() => navigation.navigate('Login')}/>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    </SlideHorizontal>
    )
}
const baseStyles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.952)',
        minHeight: '60%'
    },
})
    
