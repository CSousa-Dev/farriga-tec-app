import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp/SignUp";

const Stack = createNativeStackNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
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
                    name="Home" 
                    component={Home}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
