import React from "react";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "react-native-svg";

export default function TopBar() {
    return (
        <View style={{elevation: 50, paddingVertical: 16, paddingTop: 48, backgroundColor: '#ffffff'}}>
            <Text style={{textAlign: 'center', fontSize: 18,color: "#666"}}>Bem vindo:</Text>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#235818"}}>Renato sousa</Text>
        </View>
    )
}