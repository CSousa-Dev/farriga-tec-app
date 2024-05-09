import { Dimensions, ScrollView, View, Text } from "react-native";
import Input from "../../../components/Form/Input/Input";
import { useEffect, useState } from "react";
import BasicUserDataInterface from "../../../Interfaces/Domain/Account/BasicUserDataInterface";

interface BasicDataStepProps {
    onChange: (data: BasicUserDataInterface, isReadyStep: boolean) => void;
    validationErrors?: Record<string, string[]>;
    initialValues ?: BasicUserDataInterface;
}

export default function BasicDataStep(props: BasicDataStepProps)
{
    const maxHeight = Dimensions.get('window').height * 0.4;
    const [basicData, setBasicData] = useState<BasicUserDataInterface>({
        firstName: props.initialValues?.firstName || '',
        lastName: props.initialValues?.lastName || '',
        documentNumber: props.initialValues?.documentNumber || '',
        documentType: 'CPF',
        birthDate: props.initialValues?.birthDate || '',
        email: props.initialValues?.email || ''
    });
    const [isStepReady, setIsStepReady] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.validationErrors, 'validationErrorsInBasicStep')
        onChangeHandler(basicData);
    },[])

    const onChangeHandler = (basicData: BasicUserDataInterface) => {
        const isReady = Object.values(basicData).every(value => value.length > 0);
        setIsStepReady(isReady);
        setBasicData(basicData);
        props.onChange(basicData, isReady);
    }

    return (
        <View style={{ flex: 1 }}>
        <ScrollView
            style={{ maxHeight, overflow: 'hidden' }}
            showsVerticalScrollIndicator={true}
        >                
            <Input 
                value={basicData.firstName}
                keyboardType="default"
                label="Nome" 
                type="text"
                placeholder="Informe seu nome aqui..."
                onChange={(value) => onChangeHandler({...basicData, firstName: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['firstName'] || []}
            />
            <Input 
                value={basicData.lastName}
                keyboardType="default"
                label="Sobrenome" 
                type="text"
                placeholder="Informe seu sobrenome aqui..."
                onChange={(value) => onChangeHandler({...basicData, lastName: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['lastName'] || []}
            />
            <Input 
                value={basicData.documentNumber}
                keyboardType="numeric"
                label={basicData.documentType} 
                type="text"
                format="###.###.###-##"
                placeholder="Informe seu nome aqui..."
                onChange={(value) => onChangeHandler({...basicData, documentNumber: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['document'] || []}
            />
            <Input 
                value={basicData.birthDate}
                label="Data de Nascimento" 
                type="date"
                placeholder="Informe sua data de nascimento..."
                onChange={(value) => onChangeHandler({...basicData, birthDate: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['birthDate'] || []}
            />
            <Input 
                value={basicData.email}
                label="Email" 
                placeholder="Informe seu e-mail..."
                onChange={(value) => onChangeHandler({...basicData, email: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['email'] || []}
            />
        </ScrollView>
        { !isStepReady && 
            <Text style={{color: 'red', textAlign: 'center', fontSize: 14, marginTop: 8}}>
                Informe todos os campos para prosseguir.
            </Text>
        }
    </View>
    )
}