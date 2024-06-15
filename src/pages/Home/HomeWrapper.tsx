import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DevicesProvider } from "../../Contexts/DevicesContext";
import React from "react";
import Home from "../Home";

export default function HomeWrapper({navigation}: {navigation: NativeStackNavigationProp<any, 'Home'>}){
    return (
        <DevicesProvider>
            <Home navigation={navigation} />
        </DevicesProvider>
    )
}