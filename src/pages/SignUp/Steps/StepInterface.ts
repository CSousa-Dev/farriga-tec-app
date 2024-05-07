import { InputType } from "./InputType"

export interface StepInterface {
    title: string
    description: string
    inputs: InputType[]
    skip?: boolean,
    password?: boolean
    validForNextStep(): boolean
    notFilledMessage?: string
}