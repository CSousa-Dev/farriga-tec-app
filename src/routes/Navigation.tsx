import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Initial from "../pages/Initial";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp/SignUp";
import EmailConfirmation from "../pages/EmailConfirmation";

const Stack = createNativeStackNavigator();

export default function Navigation(){
    
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
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
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

