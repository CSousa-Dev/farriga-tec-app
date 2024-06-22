import { useEffect, useState } from 'react';
import * as Paho from 'paho-mqtt';
import { useEventEmitter } from './useEventEmitter';

const useMqtt = (hostUri: string, port:number, clientId:string, userName:string, password:string) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const {emitEvent} = useEventEmitter();
  const [client, setClient] = useState(new Paho.Client(hostUri, clientId));

    useEffect(() => {
        configClient();
        connect();

        return () => {
            if (client && client.isConnected()) {
                client.disconnect();
            }
        };
    }, []);

    const configClient = () => {
        client.onConnectionLost = (responseObject: any) => {
        if (responseObject.errorCode !== 0) {
            console.error('onConnectionLost:' + responseObject.errorMessage);
        }
        setConnected(false);
        };

        client.onMessageArrived = (message: any) => {
            console.log('oi')
            emitEvent('receiveMessage', {message: message.payloadString, topic:message.destinationName});
        };

        setClient(client);
    }

    const connect = () => {
        if (!client) {
            console.log('Client is not initialized');
            return;
        }

        client.connect({
            userName,
            password,
            onSuccess: () => {
                console.log('Connection established');
                setConnected(true);
            },
            onFailure: (error: any) => {
                console.error(error);
                setConnected(false);
            },
        });

        setClient(client);
    };

    const sendMessage = (messageText: string, destination: string) => {
        if (client && connected) {
        const message = new Paho.Message(messageText);
        message.destinationName = destination;
        client.send(message);
        } else {
        console.error('Client is not connected');
        }
    };

    const subscribe = (topic: string) => {
        if (client && connected) {
            client.subscribe(topic);
        } else {
            console.log('MQTT error client not connected');
        }
    }

   

  return { connected, messages, sendMessage, subscribe, client };
};

export default useMqtt;
