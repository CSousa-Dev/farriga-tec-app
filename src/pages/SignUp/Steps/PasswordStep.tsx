import { Dimensions, ScrollView, View, Text } from "react-native";
import Input from "../../../components/Form/Input/Input";
import { useState } from "react";

interface PasswordProps {
    onChange: (data: Password, isReady: boolean) => void;
    validationErrors?: Record<string, string[]>;
}

interface Password {
    password: string;
    confirmationPassword: string;
}

export default function PasswordStep(props: PasswordProps)
{
    const maxHeight = Dimensions.get('window').height * 0.4;
    const [password, setPassword] = useState<Password>({
        password: '',
        confirmationPassword: ''
    });
    const [isStepReady, setIsStepReady] = useState<boolean>(false);

    const onChangeHandler = async (password: Password) => {
        const isReady = confirmationPasswordIsEqual();
        setIsStepReady(isReady);
        setPassword(password);
        props.onChange(password, isReady);
    }

    const confirmationPasswordIsEqual = () => {
        if(password.password.length === 0 || password.confirmationPassword.length === 0) return false;
        return password.password === password.confirmationPassword;
    }

    return (
        <View style={{ flex: 1 }}>
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
                value={password.confirmationPassword}
                label="Confirme a senha" 
                type="password"
                placeholder="Informe a confirmação da senha aqui..."
                onChange={(value) => onChangeHandler({...password, confirmationPassword: value})}
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
    </View>
    )
}