import { StyleSheet } from "react-native";

export const BaseStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff',
        width: '23%',
        padding: 6,
        borderRadius: 12,
        elevation: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sensorName: {
        fontSize: 12,
        color: '#028f19',
        textAlign: 'center'
    },
    sensorValue: {
        textAlign:'center'
    }
});