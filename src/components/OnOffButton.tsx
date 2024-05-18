import { View, Text, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function OnOffButton({onClick, on}:{onClick: () => void, on: boolean}) {
    return (
        <TouchableHighlight underlayColor={'#007914'} onPress={onClick} style={{borderRadius: 16, height: 70}}>
            <View style={{backgroundColor: '#ffffff', height: 70, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 16, gap:2, elevation:32}}>
                <Text style={{color: on? '#25572d' : '#ac0000'}} >{on ? 'On' : 'Off'}</Text>
                <FontAwesome name="power-off" size={24} color={on ? "#25572d" : '#ac0000'}/>
            </View>
        </TouchableHighlight>
    )
}   
