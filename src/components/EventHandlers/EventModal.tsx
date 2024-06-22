import React, { ReactNode } from "react";
import { Modal, View, Text  } from "react-native";

export default function EventModal(
    {
        visible,
        children,
        onClose
    }: {
        visible: boolean;
        children: ReactNode;
        onClose: () => void;
    }
)
{

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View
                style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                }}
            >
                <View style={{flex: 1}} onTouchEnd={onClose}></View>
                <View style={{
                    backgroundColor: '#ffffff',
                    padding: 32,
                    borderTopStartRadius: 16,
                    borderTopEndRadius: 16,
                    elevation: 24,
                }}>
                    {children}
                    <Text 
                        onPress={onClose}
                        style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'center',
                            width: '100%',
                            marginTop: 16
                        
                        }}
                    >Fechar</Text>
                </View>
            </View>
        </Modal>
    );
}