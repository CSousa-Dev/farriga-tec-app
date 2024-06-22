import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function TopBar() {

    const [isPressed, setIsPressed] = useState(false);
    const [pressStartTime, setPressStartTime] = useState<number>(0);
    const navigation = useNavigation<NativeStackNavigationProp<any,string>>();

    useEffect(() => {
      let timer = null;
      if (isPressed) {
        timer = setTimeout(() => {
          if (isPressed) {
            navigation.navigate('DeviceBleKeys');
          }
        }, 5000);
      } else {
        if(timer)
            clearTimeout(timer);
      }


      return () => timer ?  clearTimeout(timer): undefined;
    }, [isPressed]);
  
    const handlePressIn = () => {
        console.log('oi');
      setIsPressed(true);
      setPressStartTime(Date.now());
    };
  
    const handlePressOut = () => {
      setIsPressed(false);
      const pressDuration = Date.now() - pressStartTime;
      if (pressDuration < 5000) {
        console.log('O botão foi solto antes de 5 segundos');
      }
    };
    
    return (
        <View style={{elevation: 50, paddingVertical: 16, paddingTop: 48, backgroundColor: '#ffffff'}}>
            <TouchableWithoutFeedback 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            ><Text style={{textAlign: 'center', fontSize: 18,color: "#666"}}>Bem vindo:</Text></TouchableWithoutFeedback>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#235818"}}>Renato sousa</Text>
        </View>
    )
}