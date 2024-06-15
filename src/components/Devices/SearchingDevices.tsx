import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function SearchingDevices() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
        <Text style={{textAlign: 'center', fontSize: 18, color: '#666', width: '100%', marginBottom: 16}}>Buscando Dispositivos</Text>
        <ActivityIndicator size={"large"} color="#0f9e20" />
    </View>
  );
}