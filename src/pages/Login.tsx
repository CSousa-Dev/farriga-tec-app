import { useEffect, useState } from "react";
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
import Input from "../components/Form/Input/Input";
import login from "../services/Account/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";


export default function Login({navigation} : {navigation: NativeStackNavigationProp<any, 'Login'> }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    
    const handlePassword = (text: string) => {
        setPassword(text);
    };

    const handleEmail = (text: string) => {
        setEmail(text);
    };

    const handleChange = () => {

    }

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await login({
                username: email,
                password: password
            }, navigation);

            let token = (response as AxiosResponse).data.token;
            await AsyncStorage.setItem('@token', token);
            setIsLoading(false);
            navigation.navigate('Home');
        } catch (error) {
            setIsLoading(false);
        }
    };


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
                    source={require('../../assets/farm.jpg')} 
                >
                    <View style={baseStyles.container}>
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
                            disabled={email == ''|| password == ''}  
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
