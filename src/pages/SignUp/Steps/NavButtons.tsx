import { useState } from "react";
import { View } from "react-native";
import Button from "../../../components/Form/Button";

interface NavButtonsProps {
    numberOfSteps: number;
    currentStep?: number;
    isLoading?: boolean;
    isReadyStep?: boolean;
    canReturn?: boolean;
    buttonNextText?: string;
    buttonPreviousText?: string;
    buttonFinishText?: string;
    buttonCancelText?: string;
    showCancel?: boolean;
    showFinish?: boolean;
    preventDefault?: boolean;
    onFinished?: () => void;
    onChange?: (currentStep: number) => void;
    onNext?: (currentStep: number) => void;
    onPrevious?: (currentStep: number) => void;
    onCancel?: () => void;
}

export default function NavButtons ({
    numberOfSteps,
    isLoading = false,
    isReadyStep = true,
    canReturn = true,
    buttonNextText = 'Próximo',
    buttonPreviousText = 'Anterior',
    buttonFinishText = 'Finalizar',
    buttonCancelText = 'Cancelar',
    showCancel = true,
    showFinish = true,
    preventDefault = false,
    ...props
}: NavButtonsProps) {
    
    const [defaultStep, setDefaultStep] = useState<number>(0);

    const hasNextStep = () => {
        if(preventDefault && props.currentStep) {
            return props.currentStep < numberOfSteps - 1;
        };
        
        return defaultStep < numberOfSteps - 1;
    }

    const hasPreviuosStep = () => {
        if(preventDefault && props.currentStep) {
            return props.currentStep > 0;
        };

        return defaultStep > 0;
    }

    const isLastStep = () => {
        if(preventDefault && props.currentStep) {
            return props.currentStep === numberOfSteps - 1;
        };

        return defaultStep === numberOfSteps - 1;
    }

    const onNextStep = () => {
        if(isLoading) return;

        if(!preventDefault && hasNextStep()) {
            props.onChange && props.onChange(defaultStep + 1);
            props.onNext && props.onNext(defaultStep + 1);
            setDefaultStep(defaultStep + 1);
            return;
        }

        props.onChange && props.onChange(defaultStep + 1);
        props.onNext && props.onNext(defaultStep + 1);
    }

    const onFinsh = () => {
        props.onFinished && props.onFinished();
    }

    const onPreviusStep = () => {
        if(!preventDefault && hasPreviuosStep()) {
            props.onChange && props.onChange(defaultStep - 1);
            props.onPrevious && props.onPrevious(defaultStep - 1);
            setDefaultStep(defaultStep - 1);
            return;
        }

        props.onChange && props.onChange(defaultStep - 1);
        props.onPrevious && props.onPrevious(defaultStep - 1);
    }

    const onCancel = () => {
        props.onCancel && props.onCancel();
    }

    return(
        <View>
            {!hasNextStep() && showFinish &&  
            <Button
                text={buttonFinishText} 
                loading={isLoading}
                onPress={() => onFinsh()}
                containerStyle={{
                    marginVertical: 16,
                    width: '85%',
                    alignSelf: 'center'
                }}
                disabled={!isReadyStep}
            />
            }
            {hasNextStep() && !isLastStep() &&
            <Button
                text={buttonNextText} 
                loading={isLoading}
                onPress={() => onNextStep()}
                containerStyle={{
                    marginVertical: 16,
                    width: '85%',
                    alignSelf: 'center'
                }}
                disabled={!isReadyStep}
            />
            }
            {showCancel && !hasPreviuosStep() &&
                <Button
                    text={buttonCancelText}
                    type='outlined'
                    onPress={() => onCancel()}
                    containerStyle={{
                        width: '85%',
                        alignSelf: 'center'
                    }} 
                    disabled={isLoading}   
                />
            }
            {hasPreviuosStep() && 
            <Button
                text={buttonPreviousText}
                type='outlined'
                onPress={() => onPreviusStep()}
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