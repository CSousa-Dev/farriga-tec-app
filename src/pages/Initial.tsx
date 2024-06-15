import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import Button from "../components/Form/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

export default function Initial({navigation} : {navigation: NativeStackNavigationProp<any, 'Initial'> }){
    return (
        <ImageBackground 
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
            source={require('../../assets/farm.jpg')} 
        >
        <View 
            style={baseStyles.container}
        >
            <Image 
                style={{
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    height: 100,
                    marginBottom: 16

                }}
                alt='logo Irrigatec' 
                source={require('../../assets/FarrigaTecLog.png')}
            />
            <Text style={textContentStyles.title}> Seja bem vindo!</Text>
            <Text style={textContentStyles.slogan}> Revolucionando a produção agrícola em pequenas e médias plantações.</Text>
            <Button 
                onPress={() => navigation.navigate('Login')}
                text="Entre" 
                containerStyle={{
                    width: '80%',
                    alignSelf: 'center'                
                }}
            />
            <View style={dividerStyles.container}>
                <View style={dividerStyles.row} />
                <Text style={dividerStyles.text}>ou</Text>
                <View style={dividerStyles.row} />
            </View>
            <Button 
                text="Cadastre-se" 
                type="outlined"
                containerStyle={{
                    width: '80%',
                    alignSelf: 'center'
                }}
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
        </ImageBackground>
    )
}

const baseStyles = StyleSheet.create({
    container: {
        flex: .65,
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: 'auto'
    },
})

const textContentStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500',
        marginHorizontal: 10,
        color: '#235818'
    },
    slogan: {
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 32,
        color: '#235818',
        textAlign: 'center'
    }
})

const dividerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 70,
        marginVertical: 16
    },
    row: {
        flex: 1,
        height: 1,
        backgroundColor: '#147a00'
    },
    text: {
        fontSize: 18,
        minWidth: 25,
        marginHorizontal: 10,
        color: '#235818'
    }
})