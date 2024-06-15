import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { 
    Text, 
    StyleSheet
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import StepTemplate from "./Steps/StepTemplate";
import BasicDataStep from "./Steps/BasicDataStep";
import AddressStep from "./Steps/AddressStep";
import PasswordStep from "./Steps/PasswordStep";
import { BasicUserDataValidation } from "../../services/Validation/BasicUserDataValidation";
import { validationService } from "../../services/Validation/validationService";
import BasicUserDataInterface from "../../Interfaces/Domain/Account/BasicUserDataInterface";
import AddressInterface from "../../Interfaces/Domain/Account/AddressInterface";
import NewPasswordInterface from "../../Interfaces/Domain/Account/NewPasswordInterface";
import NavButtons from "./Steps/NavButtons";
import { AddressDataValidation } from "../../services/Validation/AddressValidation";
import { PasswordValidation } from "../../services/Validation/PasswordValidation";
import registerAccount, { RegisterAccountRequestInterface } from "../../services/Account/registerAccount";
import React from "react";

interface Step {
    title: string,
    description: string,
    validationErrors?: Record<string, string | string[]> | []
    data?: BasicUserDataInterface | AddressInterface | NewPasswordInterface
}

interface BasicDataStep extends Step {
    data: BasicUserDataInterface
}

interface AddressStep extends Step {
    data: AddressInterface
}

interface PasswordStep extends Step {
    data: NewPasswordInterface
}

interface Steps {
    basicData: BasicDataStep,
    address: AddressStep,
    password: PasswordStep
}

export default function SignUp({navigation} : {navigation: NativeStackNavigationProp<any, 'SignUp'> }){
    const [isReadyStep  , setIsReadyStep  ]     = useState<boolean>(false);
    const [isLoading    , setIsLoading    ]     = useState<boolean>(false);
    const [currentStep  , setCurrentStep  ]     = useState<number>(0);
    const [stepsConfig  , setStepsConfig  ]     = useState<Steps>({
        basicData: {
            title: 'Dados Pessoais',
            description: 'Vamos começar com seus dados pessoais',
            validationErrors: [],
            data: {
                firstName: '',
                lastName: '',
                email: '',
                documentType: '',
                documentNumber: '',
                birthDate: ''
            }
        },
        address: {
            title: 'Endereço',
            description: 'Agora é importante sabermos seu endereço',
            validationErrors: [],
            data: {
                zipCode: '',
                street: '',
                number: '', 
                neighborhood: '',
                city: '',
                state: '',
                country: '',
                reference: '',
                complement: ''
            }
        },
        password: {
            title: 'Senha',
            description: 'Precisamos que você crie uma senha segura',
            validationErrors: [],
            data: {
                password: '',
                passwordConfirmation: ''
            }
        }
    });

    const handleNext = async () => {
        let validationData = getValidationDataFor(getCurrentStepKey());
        setIsLoading(true);

        if(getCurrentStepKey() == 'address' && everyFieldsIsEmpty(validationData.getBody())) {
            setIsLoading(false);
            clearErrorsForCurrentStep();
            setCurrentStep(currentStep + 1);
            return;
        }

        try {
            let response = await validationService(validationData);
            let hasErrors = response?.errors && Object.keys(response.errors).length > 0;
            
            if(hasErrors && response?.errors){
                setErrorsForCurrentStep(response.errors);
                setIsLoading(false);
                Toast.error('Uhmm... existem erros de validação nos dados informados, revise os campos e tente avançar novamente. ', 'bottom');
            }

            if(!hasErrors){
                clearErrorsForCurrentStep();
                setIsLoading(false);
                setCurrentStep(currentStep + 1);
                Toast.success('Dados validados com sucesso! Vamos para o próximo passo...', 'bottom');
            }
        } catch (error) {
            setIsLoading(false);
            Toast.error('Ops! Algo deu errado, tente novamente', 'bottom');
        }
    }

    const getValidationDataFor = (stepKey: string) => {
        let possibleValidations = {
            basicData:  new BasicUserDataValidation(stepsConfig.basicData.data),
            address:    new AddressDataValidation(stepsConfig.address.data),
            password:   new PasswordValidation(stepsConfig.password.data)
        }

        if(stepKey !== 'address' && stepKey !== 'basicData' && stepKey !== 'password' ) throw new Error('Invalid step key');
        
        return possibleValidations[stepKey];
    }

    const everyFieldsIsEmpty = (data: Object) => {
        return Object.values(data).every(value => value === '' || value === null || value === undefined);
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleFinish = async () => {
        let validationData = getValidationDataFor(getCurrentStepKey());
        setIsLoading(true);
        try {
            let response = await validationService(validationData);
            let hasErrors = response?.errors && Object.keys(response.errors).length > 0;
            
            if(hasErrors && response?.errors){
                setErrorsForCurrentStep(response.errors);
                setIsLoading(false);
                Toast.error('Uhmm... existem erros de validação nos dados informados, revise os campos e tente avançar novamente. ', 'bottom');
            }

            if(!hasErrors){
                setIsLoading(false);
                clearErrorsForCurrentStep();
                register();
                Toast.success('Sua conta foi cadastrada com sucesso, seja bem vindo ao FarrigaTec.', 'bottom');
                navigation.navigate('Welcome');
            }
        } catch (error) {
            setIsLoading(false);
            Toast.error('Ops! Algo deu errado, tente novamente', 'bottom');
        }
    }

    const handleCancel = () => {
        navigation.navigate('Initial');
    }

    const getCurrentStepKey = () => {
        return Object.keys(stepsConfig)[currentStep];
    }

    const clearErrorsForCurrentStep = () => {
        setStepsConfig({...stepsConfig, [getCurrentStepKey()]: {...Object.values(stepsConfig)[currentStep], validationErrors: []}});
    }

    const setErrorsForCurrentStep = (errors: Record<string, string[]>) => {
        setStepsConfig({...stepsConfig, [getCurrentStepKey()]: {...Object.values(stepsConfig)[currentStep], validationErrors: errors}});
    }

    const onChangeDataHandler = (data: BasicUserDataInterface | AddressInterface | NewPasswordInterface, isReady: boolean) => {
        setIsReadyStep(isReady);
        setStepsConfig({...stepsConfig, [getCurrentStepKey()]: {...Object.values(stepsConfig)[currentStep], data}});
    }

    const register = async () => {
        let requestBody : RegisterAccountRequestInterface = {
            firstName: stepsConfig.basicData.data?.firstName || '',
            lastName: stepsConfig.basicData.data?.lastName || '',
            email: stepsConfig.basicData.data?.email || '',
            birthDate: stepsConfig.basicData.data?.birthDate || '',
            plainPassword: stepsConfig.password.data?.password || '',
            document: {
                number: stepsConfig.basicData.data?.documentNumber || '',
                type: stepsConfig.basicData.data?.documentType || ''
            }
        }

        const hasAddressData = Object.values(stepsConfig.address.data).some(value => value !== '');

        if(hasAddressData){
            requestBody.address = {
                zipCode: stepsConfig.address.data?.zipCode || '',
                street: stepsConfig.address.data?.street || '',
                number: stepsConfig.address.data?.number || '',
                neighborhood: stepsConfig.address.data?.neighborhood || '',
                city: stepsConfig.address.data?.city || '',
                state: stepsConfig.address.data?.state || '',
                country: stepsConfig.address.data?.country || '',
                complement: stepsConfig.address.data?.complement || '',
                reference: stepsConfig.address.data?.reference || ''
            }
        }

        try {
            let response = await registerAccount(requestBody);
            console.log(response)
            return response;
        } catch (error) {
            if((error as any).response.status == 422)
                Toast.error(`Ops! ${(error as any).response.data.message}`, 'bottom');
            
            console.log(error)
        }     
    }



    return (
        <StepTemplate
            description={Object.values(stepsConfig)[currentStep].description}
            currentStepNumber={currentStep + 1}
            title={Object.values(stepsConfig)[currentStep].title}
        >

            {Object.keys(stepsConfig)[currentStep] == 'basicData' && 
            <BasicDataStep 
                onChange={(basicData, isReady) => onChangeDataHandler(basicData, isReady)}
                initialValues={Object.values(stepsConfig)[currentStep].data as BasicUserDataInterface || {}}    
                validationErrors={Object.values(stepsConfig)[currentStep].validationErrors || []}
            />
            }

            {Object.keys(stepsConfig)[currentStep] == 'address' && 
            <AddressStep 
                onChange={(address, isReady) => onChangeDataHandler(address, isReady)}
                initialValues={Object.values(stepsConfig)[currentStep].data as AddressInterface || {}} 
                validationErrors={Object.values(stepsConfig)[currentStep].validationErrors || []}     
            />
            }

            {Object.keys(stepsConfig)[currentStep] == 'password' && 
                <PasswordStep 
                    onChange={(password, isReady) => onChangeDataHandler(password, isReady)}
                    initialValues={Object.values(stepsConfig)[currentStep].data as NewPasswordInterface || {}}
                    validationErrors={Object.values(stepsConfig)[currentStep].validationErrors || []}
                />
            }
            
            <NavButtons
                preventDefault
                numberOfSteps={Object.keys(stepsConfig).length}
                isLoading={isLoading}
                isReadyStep={isReadyStep}
                currentStep={currentStep}
                onNext={() => handleNext()}
                onPrevious={handlePrevious}
                onFinished={handleFinish}
                onCancel={handleCancel}
            />

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

