import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RNEventSource from 'react-native-event-source'
import EventSource from "react-native-sse";


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

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Token: {token}</Text>
            <Text>Event Stream Data: {data}</Text>
        </View>
    );
}