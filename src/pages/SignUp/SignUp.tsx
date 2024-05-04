import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    KeyboardAvoidingView, 
    ImageBackground, 
    Platform, 
    ScrollView, 
    Image, 
    StyleSheet, 
} from "react-native";
import Button from "../../components/Form/Button";
import Stepper from "./Stepper";
import { StepObjectInterface } from "./Steps/StepObjectInterface";
import StepTemplate from "./StepTemplate";
import StepBasicUserData from "./Steps/StepBasicUserData";
import StepAddress from "./Steps/StepAddress";

export default function SignUp({navigation} : {navigation: NativeStackNavigationProp<any, 'SignUp'> }){
    const [stepper, setStepper] = useState<Stepper>();
    const [step, setStep] = useState<StepObjectInterface>();
    const [isReadyStep, setIsReadyStep] = useState<boolean>(false);
    const [currentErrors, setCurrentErrors] = useState<Record<string, string[]>>();

    useEffect(() => {
        const newStepper = new Stepper(
            new StepBasicUserData(),
            new StepAddress()
        );
        setStepper(newStepper);
        setStep(newStepper.currentStep());
        setIsReadyStep(newStepper?.isReadyForNextStep() || false)
    },[])

    async function nextStep(){
        try{
            let response = await stepper?.validateCurrentStep();
            if(response){
                setCurrentErrors(response.errors);
                return;
            }
        } catch(e){
            console.log('erro ao validar', e);
        }


        // stepper?.nextStep();
        // setIsReadyStep(stepper?.isReadyForNextStep() || false)
        // setStep(stepper?.currentStep());
    }

    function previousStep(){
        stepper?.previousStep();
        setIsReadyStep(stepper?.isReadyForNextStep() || false)
        setStep(stepper?.currentStep());
    }

    let NavButtons = () => {
        return(
            <View>
                {stepper?.hasNextStep() ? (
                    <Button
                        text='Próximo' 
                        onPress={() => nextStep()}
                        containerStyle={{
                            marginTop: 16,
                            marginVertical: 8,
                            width: '85%',
                            alignSelf: 'center'
                        }}
                        // disabled={!isReadyStep}
                    />
                ): (
                    <Button
                        text='Finalizar' 
                        onPress={() => nextStep()}
                        containerStyle={{
                            marginTop: 16,
                            marginVertical: 8,
                            width: '85%',
                            alignSelf: 'center'
                        }}    
                        disabled={!isReadyStep}
                    />  
                )}
                {stepper?.hasPreviousStep() && (
                    <Button
                        text='Anterior' 
                        type='outlined'
                        onPress={() => previousStep()}
                        containerStyle={{
                            width: '85%',
                            alignSelf: 'center'
                        }}    
                    />
                )}
            </View>
        )
    }   

    // const handleChangeStep = () => {
    //     setIsReadyStep(stepper?.requiredFieldsIsFilled() || false)
    // }

    const handleDataChange = (value:string , index: number) => {
        stepper?.setValue(value, index);
        setIsReadyStep(stepper?.isReadyForNextStep() || false)
    }

    return (
        <StepTemplate
            dataChangeHandler={handleDataChange}
            description={step?.description || ''}
            currentStepNumber={stepper?.getCurrentStepNumber() || 0}
            title={step?.title || ''}
            step={step}
            navigation={navigation}
            currentErrors={currentErrors? currentErrors : {}}
        >
            {!isReadyStep &&
                <Text style={{textAlign: 'center', color: '#ca0000', marginVertical: 12}} >{step?.notFilledMessage}</Text>
            } 

            <NavButtons/>
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
