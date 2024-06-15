import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ReactElement } from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";


export default function Button(props: ButtonProps) {    
    
    let type = props.type ? props.type : 'filled';
    
    let buttonStyle: DisponibleStyles = {
        filled: filledStyle,
        outlined: outlinedStyle
    }
    
    let selectedStyle = buttonStyle[type];
        
    let StyledText = (): ReactElement => {
        if(props.loading && type == 'outlined') 
            return <ActivityIndicator size="large" color="#0f9e20" />

        if(props.loading && type == 'filled')
             return <ActivityIndicator size="large" color="#CCCCCC" />

        return <Text style={selectedStyle.text}>{props.text}</Text>
    };

    let colors = props.disabled ? ['#CCCCCC', '#CCCCCC', '#CCCCCC'] : ['#045f18', '#1d722b', '#1d4926']
    let Gradient = (): ReactElement => {
        return (
            <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{borderRadius: 12, minHeight: 60, justifyContent: 'center', elevation: 32}}
            colors={colors}
            >  
                <StyledText/>
            </LinearGradient>
        )
    }

    let Content: DisponibleContents = {
        filled: Gradient(),
        outlined: StyledText()
    }
    
    return (
        <TouchableOpacity 
        onPress={props.onPress} 
        activeOpacity={.5} 
        disabled={props.disabled}
        style={{...selectedStyle.button, width: '100%',  ...props.containerStyle, elevation: 20}}
        >
            {Content[type]}
        </TouchableOpacity>
    )
}

interface ButtonProps {
    type?: 'filled' | 'outlined'
    onPress?: () => void 
    text: string
    containerStyle?: StyleSheet.NamedStyles<object>
    size?: 'sm' | 'md' | 'lg',
    disabled?: boolean
    loading?: boolean
}


type DisponibleStyles = {
    filled: StyleSheet.NamedStyles<Button>
    outlined: StyleSheet.NamedStyles<Button>
}

type DisponibleContents = {
    filled: ReactElement,
    outlined: ReactElement
}

type Button = {
    button: object
    text: object
}

const filledStyle: StyleSheet.NamedStyles<Button> = StyleSheet.create({
    button: {
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        textAlignVertical: 'center',
        padding: 18
    }
})

const outlinedStyle: StyleSheet.NamedStyles<Button>  = StyleSheet.create({
    button: {
        backgroundColor: '#ececec',
        borderWidth: 1,
        borderColor: '#0f9e20',
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        padding: 18,
        textAlign:  'center',
        color: '#0f9e20'
    }  
})