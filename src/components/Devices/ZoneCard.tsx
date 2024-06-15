import React, { useState } from "react";
import { Pressable, View, Text, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
interface ZoneCardProps {
    position: number;
    alias: string;
    selected?: boolean;
    editing?: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: (position: number, newAlias: string) => void;
    onPress?: () => void;
}

export default function ZoneCard({position, alias, selected, onPress, onSave, onCancelEdit, onEdit, editing}: ZoneCardProps){
    const [newAlias, setNewAlias] = useState<string>(alias ?? 'Zona' + position)

    const handleEdit = () => {
        setNewAlias(alias ?? 'Zona' + position)
        onEdit()
    }

    return (
        <Pressable style={{backgroundColor: "#ffff", padding: 8, borderRadius: 6, borderWidth: selected ? 4 : 2, borderColor: selected ? '#03e703' : '#666'}} onPress={onPress}>
            {!editing && <Text style={{width: '100%', textAlign: "center", color: selected ? '#058105' : '#666'}}>{alias ?? 'Zona' + position} {selected && <Feather name="edit" size={16} color="#1d4926" onPress={() => handleEdit()} />}
            </Text>}

            {selected && editing && <View style={{flexDirection: "row", alignContent: 'center', justifyContent: 'center', gap: 3}}><TextInput
                autoFocus
                value={newAlias}
                onChangeText={setNewAlias}
                style={{color: '#666'}}
            /><Text> {newAlias.length > 0 && <Ionicons onPress={() => onSave(position, newAlias)} name="checkmark-done-outline" size={22} style={{marginHorizontal: 6}} color="#058105" />} <MaterialIcons name="cancel" size={22} color="#ac0000" onPress={() => onCancelEdit()} /></Text></View>}
            
        </Pressable>
    )
}