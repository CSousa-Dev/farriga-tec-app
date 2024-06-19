import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/routes/Navigation";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from "react";


export default function App() {
    

    const createAppKey = async () => {
      const appKey = await SecureStore.getItemAsync('appKey');
      if (!appKey) {
        const randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await SecureStore.setItemAsync('appKey', randomKey);
      }
    };

    useEffect(() => {
      createAppKey();
    }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar/>
        <Navigation/>
    </SafeAreaView>
  );
}