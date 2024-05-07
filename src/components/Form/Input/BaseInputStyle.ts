import {StyleSheet} from "react-native";

export const BaseInputStyle = StyleSheet.create({
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