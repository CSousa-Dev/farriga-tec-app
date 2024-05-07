import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet
} from "react-native";
import Button from "../../components/Form/Button";
import ToastManager, { Toast } from "toastify-react-native";
import StepTemplate from "./Steps/StepTemplate";
import BasicDataStep from "./Steps/BasicDataSetp";
import AddressStep from "./Steps/AddressStep";
import PasswordStep from "./Steps/PasswordStep";
import { validateBasicUserData } from "../../services/Validation/validateBasicUserData";

export default function SignUp({navigation} : {navigation: NativeStackNavigationProp<any, 'SignUp'> }){
    const [isReadyStep, setIsReadyStep]     = useState<boolean>(false);
    const [isLoading, setIsLoading]         = useState<boolean>(false);
    const [stepsConfig, setStepsConfig]     = useState([
        {
            title: 'Dados Pessoais',
            description: 'Vamos começar com seus dados pessoais',
            component: <BasicDataStep onChange={(basicData, isReady) => onChangeHandler(basicData, isReady)}/>,
            validationService: validateBasicUserData,
            validationErrors: []
        },
        {
            title: 'Endereço',
            description: 'Agora é importante sabermos seu endereço',
            component: <AddressStep onChange={(address, isReady) => onChangeHandler(address, isReady)}/>
        },
        {
            title: 'Senha',
            description: 'Precisamos que você crie uma senha segura',
            component: <PasswordStep onChange={(password, isReady) => onChangeHandler(password, isReady)}/>
        }
    ]);

    const [currentStep, setCurrentStep] = useState<number>(0);

    const nextStep = () => {
        if(currentStep === stepsConfig.length - 1) return;
        setCurrentStep(currentStep + 1);
    }

    const previousStep = () => {
        if(currentStep === 0) navigation.navigate('Home');
        setCurrentStep(currentStep - 1);
    }

    const onChangeHandler = (data: Object , isReady: boolean) => 
    {
        console.log(data, isReady)
        setIsReadyStep(isReady);
    }

    let NavButtons = () => {
        return(
            <View>
                { currentStep <= stepsConfig.length - 1  && 
                    <Button
                        text={currentStep === stepsConfig.length -1 && 'Finalizar' || 'Próximo'} 
                        loading={isLoading}
                        onPress={() => nextStep()}
                        containerStyle={{
                            marginVertical: 16,
                            width: '85%',
                            alignSelf: 'center'
                        }}
                        disabled={!isReadyStep}
                />}

                { currentStep >= 0 && 
                    <Button
                        text={currentStep === 0 ? 'Cancelar' : 'Anterior'}
                        type='outlined'
                        onPress={() => previousStep()}
                        containerStyle={{
                            width: '85%',
                            alignSelf: 'center'
                        }} 
                        disabled={isLoading}   
                    />
                }
            </View>
        )
    }   

    return (
        <StepTemplate
            description={stepsConfig[currentStep].description}
            currentStepNumber={currentStep + 1}
            title={stepsConfig[currentStep].title}
        >
            <ToastManager
                height={'auto'}
                textStyle={{fontSize: 16, padding: 8, textAlign: 'center'}}
                style={{paddingRight: 32, width: 'auto', marginHorizontal: '5%'}}
                positionValue={100}
            />
                {stepsConfig[currentStep].component}
            <NavButtons/>
            <Text style={{textAlign: 'center', fontSize: 16, marginTop: 24}}>Já possui uma conta? <Text style={formStyles.ancor} onPress={() => navigation.navigate('Login')}>Acesse agora!</Text></Text>
        </StepTemplate> 
    )
}
const formStyles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        textAlign: 'center',
        marginVertical: 12,
        fontSize: 16,
        color: '#235818'
    },
    description: {
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 14,
        color: '#235818'
    },
    ancor: {
        color: '#0f9e20',
        textDecorationLine: 'underline'
    }
});

const baseStyles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 32,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.952)',
        minHeight: '85%'
    },
})
