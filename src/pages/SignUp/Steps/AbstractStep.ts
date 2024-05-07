import { ResponseFieldByFieldValidationType } from "../../../services/Validation/ResponseFieldByFieldValidationType";
import { InputType } from "./InputType";

export default abstract class Step
{
    abstract inputList: InputType[];
    private lastInvalidSet: Record<string, string> | null = null;

    inputs(): InputType[] {
        return this.inputList;
    }

    abstract getCurrentValidationSet(): Record<string, string>;
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

    public inputIsEmpty(input: InputType): boolean {
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

    currentSetIsThesameAsLastInvalidSet(): boolean {
        if(this.lastInvalidSet == null || this.getCurrentValidationSet() == null) return false;
                
        return JSON.stringify(this.lastInvalidSet) === JSON.stringify(this.getCurrentValidationSet());
    }

    validForNextStep(): boolean {
        return !this.currentSetIsThesameAsLastInvalidSet() && this.allRequiredInputsIsFilled();
    }

    abstract validationService(): Promise<ResponseFieldByFieldValidationType | null>;

    async validateStep(): Promise<ResponseFieldByFieldValidationType | null> {     
        console.log('validating step', this.getCurrentValidationSet());   
        try {
            let response = await this.validationService();
           
            if(response && Object.keys(response.errors).length > 0) {
                this.lastInvalidSet = this.getCurrentValidationSet();
                return response;
            }

            this.lastInvalidSet = null;
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    } 

    returnAssocArrayInputs(){
        let assocArray: Record<string, InputType> = {};
        this.inputList.forEach((input) => {
            assocArray[input.field] = input;
        });

        return assocArray;
    }
} 