import { View, Text, StyleSheet } from "react-native";
import OnOffButton from "../../../OnOffButton";

interface FarrigaOneHeaderProps {
    deviceName: string;
    status: string;
    lastIrrigation: string;
}

export default function FarrigaOneHeader(props: FarrigaOneHeaderProps) {
    return (
        <View style={styles.wrapper}> 
            <View>
                <Text style={{color: '#ffffff'}}>Disposivo:</Text>
                <Text style={{fontSize:22, fontWeight: 'bold', color: '#ffffff'}}>{props.deviceName}</Text>
                <Text style={{color: '#ffffff'}}>Status: {props.status}</Text>
                <Text style={{color: '#ffffff'}}>Ultima irrigação: {props.lastIrrigation}</Text>
            </View>
            <OnOffButton onClick={() => console.log('click')} on={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 8,
        justifyContent: 'space-between',
    }
});
