import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Initial from "../pages/Initial";
import SignUp from "../pages/SignUp/SignUp";
import EmailConfirmation from "../pages/EmailConfirmation";
import Welcome from "../pages/Welcome";
import ToastManager from "toastify-react-native";
import React from "react";
import SuccessfullyLinkedNewDevice from "../pages/SuccessfullyLinkedNewDevice";
import HomeWrapper from "../pages/Home/HomeWrapper";


const Stack = createNativeStackNavigator();

export default function Navigation(){
  

    return (
        <NavigationContainer>
            <ToastManager
                height={'auto'}
                textStyle={{ fontSize: 16, padding: 8, textAlign: 'center' }}
                style={{ paddingRight: 32, width: 'auto', marginHorizontal: '5%' }}
                positionValue={100}
                duration={5000}
            />
            <Stack.Navigator 
                initialRouteName="Initial"
                screenOptions={{
                    headerShown: false,
                    headerTitle: ''
                }}
            >
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                />
                <Stack.Screen 
                    name="Initial" 
                    component={Initial}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp}
                />
                <Stack.Screen 
                    name="EmailConfirmation" 
                    component={EmailConfirmation}
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeWrapper}
                />
                <Stack.Screen 
                    name="Welcome" 
                    component={Welcome}
                />
                <Stack.Screen
                    name="SuccessfullyLinkedNewDevice"
                    component={SuccessfullyLinkedNewDevice}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

