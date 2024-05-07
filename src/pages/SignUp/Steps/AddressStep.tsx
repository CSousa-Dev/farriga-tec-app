import { Dimensions, ScrollView, View, Text } from "react-native";
import Input from "../../../components/Form/Input/Input";
import { useState } from "react";


interface AddressProps {
    onChange: (data: Address, isReadyStep: boolean) => void;
    validationErrors?: Record<string, string[]>;
}

interface Address {
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    reference: string;
}

export default function AddressStep(props: AddressProps)
{
    const maxHeight = Dimensions.get('window').height * 0.4;
    const [address, setAddress] = useState<Address>({
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
        reference: ''
    });
    const [isStepReady, setIsStepReady] = useState<boolean>(false);

    const onChangeHandler = async (address: Address) => {
        const isReady = checkStepIsReady();
        setIsStepReady(isReady);
        setAddress(address);
        props.onChange(address, isReady);
    }

    const checkStepIsReady = () => {
        let someFieldIsFilled = isSomeFieldFilled();
        return someFieldIsFilled && everyFieldsIsFilled();
    }

    const isSomeFieldFilled = () => {
        return Object.values(address).some(value => value.length > 0);
    }

    const everyFieldsIsFilled = () => {
        const { complement, reference, ...fields } = address;
        return Object.values(fields).every(value => value.length > 0);
    }

    return (
        <View style={{ flex: 1 }}>
        <ScrollView
            style={{ maxHeight, overflow: 'hidden' }}
            showsVerticalScrollIndicator={true}
        >                
            <Input 
                value={address.zipCode}
                keyboardType="numeric"
                label="Código Postal" 
                format="#####-###"
                placeholder="Informe seu nome aqui..."
                onChange={(value) => onChangeHandler({...address, zipCode: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['zipCode'] || []}
            />
            <Input 
                value={address.street}
                label="Rua" 
                placeholder="Ex: Rua das Flores..."
                onChange={(value) => onChangeHandler({...address, street: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['street'] || []}
            />
            <Input 
                value={address.number}
                label="Número" 
                placeholder="Ex: 123..."
                onChange={(value) => onChangeHandler({...address, number: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['number'] || []}
            />
            <Input 
                value={address.neighborhood}
                label="Bairro" 
                placeholder="Ex: Bairro da colheita..."
                onChange={(value) => onChangeHandler({...address, neighborhood: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['neighborhood'] || []}
            />
            <Input 
                value={address.city}
                label="Cidade" 
                placeholder="Ex: Cidade do Campo..."
                onChange={(value) => onChangeHandler({...address, city: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['city'] || []}
            />
            <Input 
                value={address.state}
                label="Estado" 
                placeholder="Ex: SP"
                onChange={(value) => onChangeHandler({...address, state: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['state'] || []}
            />
            <Input 
                value={address.complement}
                label="Complemento" 
                placeholder="Ex: Casa 2, Bloco 3..."
                onChange={(value) => onChangeHandler({...address, complement: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['complement'] || []}
            />
            <Input 
                value={address.reference}
                label="Referência" 
                placeholder="Ex: Próximo ao mercado..."
                onChange={(value) => onChangeHandler({...address, reference: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['referecnce'] || []}
            />
        </ScrollView>
        { !isStepReady && 
            <Text style={{color: 'red', textAlign: 'center', fontSize: 14}}>
                Ao informar um campo do endereço todos os demais campos são obrigatórios exceto o complemento e referência.
            </Text>
        }
    </View>
    )
}