import { StyleSheet } from "react-native";

export const BaseStyle = StyleSheet.create({
    wrapper: {
        width: 100,
        height: 100,
        backgroundColor: '#ffffff',
        padding: 6,
        borderRadius: 12,
        elevation: 24,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sensorName: {
        fontSize: 12,
        color: '#028f19',
        textAlign: 'center',
        width: '100%'
    },
    sensorValue: {
        textAlign:'center'
    }
});