import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import EventSource from "react-native-sse";
import ModelFarrigaOne from "../components/Devices/Models/FarrigaOne/ModelFarrigaOne";



export default function Home({ navigation }: { navigation: NativeStackNavigationProp<any, 'Login'> }) {
    
    const [token, setToken] = useState('' as string);
    const [data, setData] = useState('' as string);
    
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@token');
                setToken(token as string);
            } catch (error) {
                console.log(error);
            }
        };

        getToken();
        console.log('oi');

        const eventSource = new EventSource('http://192.168.15.45:8000/api/irrigation/events');
        eventSource.addEventListener('open', (event: any) => {console.log('')})
        eventSource.addEventListener('message', (event: any) => {
            console.log(event)
        });
        
        return () => {
            eventSource.close();
        };

    }, []);

    let colors = ['#045f18', '#1d722b', '#228d34','#1d4926'];

    return (
       <ModelFarrigaOne/>
    );
}
