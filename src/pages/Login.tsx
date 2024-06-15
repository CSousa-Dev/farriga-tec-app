import { useEffect, useState, useCallback } from "react";
import { 
    View, 
    ImageBackground, 
    Image, 
    Text, 
    StyleSheet, 
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import Button from "../components/Form/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from '@react-navigation/native';
import Input from "../components/Form/Input/Input";
import AuthService from "../services/AuthService";
import ToastManager, { Toast } from "toastify-react-native";
import React from "react";

export default function Login({navigation} : {navigation: NativeStackNavigationProp<any, 'Login'> }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBiometricAuth = async () => {
        try {
            let lastLoggedEmail = await AuthService.lastLoggedEmail() ?? '';
            setEmail(lastLoggedEmail);
            let result = await AuthService.biometricAuth(lastLoggedEmail);

            if(result.success){
                navigation.navigate('Home');   
            }

            if(!result.success && result.tryBio){
                Toast.error(result.message, 'bottom');
            }
        } catch (error) {
            console.log(error);
            Toast.error('Erro ao tentar fazer login.', 'bottom');
        }
    };

    useEffect(() => {
        handleBiometricAuth();
    }, []);

    useFocusEffect(
        useCallback(() => {
            // Reset email and password when the screen is focused
            setEmail('');
            setPassword('');
            handleBiometricAuth();
        }, [])
    );
    
    const handlePassword = (text: string) => {
        setPassword(text);
    };

    const handleEmail = (text: string) => {
        setEmail(text);
    };

    const handleLogin = async () => {
        if(email == '' || password == '') {
            Toast.error(
                'Informe email e senha para realizar login',
                'bottom'
            )

            return;
        };
        
        setIsLoading(true);
        try {
            let authResponse = await AuthService.auth({
                username: email,
                password
            }, navigation);

            if(authResponse.success){
                setIsLoading(false);
                navigation.navigate('Home');
            };

            if(!authResponse.success){
                Toast.error(authResponse.message, 'bottom');
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Toast.error('Erro ao tentar fazer login.', 'bottom');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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
                    source={require('../../assets/farm.jpg')} 
                >
                    <View style={baseStyles.container}>
                    <ToastManager
                        height={'auto'}
                        textStyle={{fontSize: 16, padding: 8, textAlign: 'center'}}
                        style={{paddingRight: 32, width: '90%'}}
                        positionValue={300}
                        duration={5000}
                    />
                        <Image 
                            style={{
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                height: 100,
                                marginBottom: 16
                            }}
                            alt='logo Farrigatec' 
                            source={require('../../assets/FarrigaTecLog.png')}
                        />
                        <Text style={formStyles.title}>Informe os dados e clique em entrar para acessar sua conta.</Text>
                        <Input 
                            value={email}
                            label="E-mail" 
                            placeholder="email@example.com" 
                            containerStyle={{
                                width: '85%',
                                marginBottom: 8,
                                alignSelf: 'center'
                            }}
                            onChange={handleEmail}
                        />
                        <Input 
                            value={password}
                            label="Senha" 
                            type="password"
                            placeholder="Informe sua senha aqui..."
                            containerStyle={{
                                width: '85%',
                                alignSelf: 'center'
                            }}
                            onChange={handlePassword}
                        />
                        <Button
                            text='Entrar' 
                            onPress={() => handleLogin()}
                            containerStyle={{
                                marginVertical: 24,
                                width: '85%',
                                alignSelf: 'center'
                            }}
                            loading={isLoading}  
                            // disabled={email == ''|| password == ''}  
                        />
                        <Text style={{textAlign: 'center', fontSize: 16}}>Ainda não possui uma conta? <Text style={formStyles.ancor} onPress={() => navigation.navigate('SignUp')}>Cadastre-se</Text></Text>
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
        marginBottom: 32,
        fontSize: 16,
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
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.952)',
        height: 'auto'
    },
})
