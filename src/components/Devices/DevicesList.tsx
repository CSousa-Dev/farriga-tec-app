import React from 'react';
import { View, StyleSheet, FlatList,Text } from 'react-native';
import { DeviceData } from '../../services/Account/AccountDevicesService';
import Device from './Device';
import Button from '../Form/Button';

interface DevicesListProps {
    devices:  DeviceData[],
}

export default function DevicesList({devices}: DevicesListProps){

    function header () {
        return (
            <View style={{paddingLeft: 24, marginTop: 16, marginBottom: 8}}>
                <Text style={{fontSize: 20, fontWeight: '500', color: '#666', textAlign: 'left'}}>Meus dispositivos:</Text>
            </View>
        )
    }

    
    return (
        <FlatList
            data={devices}
            style={{flex: 1, width: '100%', paddingVertical: 8}}
            renderItem={({ item }
            ) => (
              <Device deviceData={item}/>
            )}
            keyExtractor={item => item.macAddress}
            ListHeaderComponent={header}
        />
    );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      
    },
});