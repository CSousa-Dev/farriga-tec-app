import { InputType } from "./InputType";

export default abstract class Step
{
    abstract inputList: InputType[];

    inputs(): InputType[] {
        return this.inputList;
    }

    allRequiredInputsIsFilled(): boolean {
        let result = true;
        this.inputList.forEach((input) => {
            if(this.inputIsRequired(input) && this.inputIsEmpty(input)) {
                result = false;
            }
        });
        return result;
    }

    private inputIsRequired(input: InputType): boolean {
        if(input.required) return true;
        if(this.whenNotEmptyFieldIsFilledThisInputIsRequired(input)) return true;
        return false;
    }

    private inputIsEmpty(input: InputType): boolean {
        return !input.value || input.value == undefined || input.value == null || input.value == '';
    }

    private findInputByFiedld(field: string): InputType {
        return this.inputList.find((input) => input.field == field) as InputType;
    }

    private getAllIfNotEmptyFields(input: InputType): string[] {
        return input.requiredIfNotEmpty || [];
    }

    private whenNotEmptyFieldIsFilledThisInputIsRequired(input: InputType): boolean {
        return this.getAllIfNotEmptyFields(input).some((field) => {
            const fieldInput = this.findInputByFiedld(field);
            return !this.inputIsEmpty(fieldInput);
        });
    }
} 