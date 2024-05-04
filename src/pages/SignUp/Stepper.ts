import { ResponseFieldByFieldValidationType } from "../../services/Validation/ResponseFieldByFieldValidationType"
import { StepObjectInterface } from "./Steps/StepObjectInterface"

export interface Steep {
    id: number
    title: string
    description: string
    inputs: Input[]
    skip?: boolean,
    password?: boolean
    notFilledMessage?: string
}

export type Input = {
    field: string,
    label: string,
    placeholder: string
    password?: boolean
    value?: string
    erros?: string[]
    format?: string
    type?: 'text' | 'numeric' | 'date'
    required?: boolean
    requiredIfNotEmpty?: string[]
}

export default class Stepper
{
    private steps: Record<number, StepObjectInterface> = [];
    private currentStepNumber: number = 1;
    public constructor(...steps: StepObjectInterface[]){
        steps.map((step, index) => {
            this.steps[index + 1] = step;
        });
    }

    public currentStep(): StepObjectInterface
    {
        return this.steps[this.currentStepNumber];
    }

    public getCurrentStepNumber(): number
    {
        return this.currentStepNumber;
    }

    // public currentStepNumbers(): number
    // {
    //     return this.step;
    // }

    public hasPreviousStep(): boolean
    {
        return this.steps[this.currentStepNumber - 1] != undefined;
    }

    public hasNextStep(): boolean
    {
        return this.steps[this.currentStepNumber + 1] != undefined;
    }

    public isReadyForNextStep(): boolean
    {
        return this.currentStep().allRequiredInputsIsFilled();
    }

    setValue(value: string, index: number): void
    {
        this.currentStep().inputs()[index].value = value;
    }

    public nextStep()
    {
        if(this.hasNextStep()) this.currentStepNumber++;
    }

    public previousStep()
    {
        if(this.hasPreviousStep()) this.currentStepNumber--;
    }

    public async validateCurrentStep(): Promise<ResponseFieldByFieldValidationType | null>
    {
        return this.currentStep().validateStep();
    }

}