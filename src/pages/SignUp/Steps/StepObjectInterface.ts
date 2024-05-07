import { ResponseFieldByFieldValidationType } from "../../../services/Validation/ResponseFieldByFieldValidationType";
import { InputType } from "./InputType";

export interface StepObjectInterface {
    readonly title: string
    readonly description: string
    readonly skip: boolean
    readonly password: boolean
    readonly notFilledMessage: string
    inputs: () => InputType[]
    allRequiredInputsIsFilled: () => boolean
    validateStep: () => Promise<ResponseFieldByFieldValidationType | null>
    validForNextStep: () => boolean
    validationIsRequired: () => boolean
    returnAssocArrayInputs: () => Record<string, InputType>
}