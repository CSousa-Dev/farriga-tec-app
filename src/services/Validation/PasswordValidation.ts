import NewPasswordInterface from "../../Interfaces/Domain/Account/NewPasswordInterface";
import { PasswordValidationInterface } from "./validationService";

export class PasswordValidation implements PasswordValidationInterface {
    
    public readonly service = "PASSWORD";
    password: string;
    passwordConfirmation: string;

    constructor(data: NewPasswordInterface) {
        this.password = data.password || '';
        this.passwordConfirmation = data.passwordConfirmation || '';
    }

    getBody() {
        return {
            password: this.password,
            passwordConfirmation: this.passwordConfirmation
        }
    }
}