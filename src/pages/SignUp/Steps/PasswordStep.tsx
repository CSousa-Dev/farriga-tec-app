import { Dimensions, ScrollView, View, Text } from "react-native";
import Input from "../../../components/Form/Input/Input";
import { useEffect, useState } from "react";
import NewPasswordInterface from "../../../Interfaces/Domain/Account/NewPasswordInterface";
import SlideHorizontal from "../../../components/Animation/SlideHorizontal";

interface PasswordProps {
    onChange: (data: NewPasswordInterface, isReady: boolean) => void;
    validationErrors?: Record<string, string[]>;
    initialValues ?: NewPasswordInterface;
}

export default function PasswordStep(props: PasswordProps)
{
    const maxHeight = Dimensions.get('window').height * 0.4;
    const [password, setPassword] = useState<NewPasswordInterface>({
        password: props.initialValues?.password || '',
        passwordConfirmation: props.initialValues?.passwordConfirmation || ''
    });
    const [isStepReady, setIsStepReady] = useState<boolean>(false);

    useEffect(() => {
        onChangeHandler(password);
    },[])

    const onChangeHandler = async (password: NewPasswordInterface) => {
        const isReady = confirmationPasswordIsEqual(password);
        setIsStepReady(isReady);
        setPassword(password);
        props.onChange(password, isReady);
    }

    const confirmationPasswordIsEqual = (password: NewPasswordInterface) => {
        if(password.password.length === 0 || password.passwordConfirmation.length === 0) return false;
        return password.password === password.passwordConfirmation;
    }

    return (
        <SlideHorizontal style={{ flex: 1 }}>
        <ScrollView
            style={{ maxHeight, overflow: 'hidden' }}
            showsVerticalScrollIndicator={true}
        >                
            <Input 
                value={password.password}
                label="Informe a senha"
                type="password" 
                placeholder="Informe sua senha aqui..."
                onChange={(value) => onChangeHandler({...password, password: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
            />
            <Input 
                value={password.passwordConfirmation}
                label="Confirme a senha" 
                type="password"
                placeholder="Repita a senha aqui..."
                onChange={(value) => onChangeHandler({...password, passwordConfirmation: value})}
                containerStyle={{
                    width: '85%',
                    marginBottom: 8,
                    alignSelf: 'center'
                }}
                validationErrors={props.validationErrors && props.validationErrors['password'] || []}
            />
        </ScrollView>
        { !isStepReady && 
            <Text style={{color: 'red', textAlign: 'center', fontSize: 14}}>
                É necessário que as senhas sejam iguais e preenchidas.
            </Text>
        }
    </SlideHorizontal>
    )
}