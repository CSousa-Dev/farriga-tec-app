import BasicUserDataInterface from "../../Interfaces/Domain/Account/BasicUserDataInterface";
import { BasicUserDataValidationInterface } from "./validationService";

export class BasicUserDataValidation implements BasicUserDataValidationInterface {
    public readonly service = "BASIC_USER_INFO"
    firstName: string;
    lastName: string;
    birthDate: string;
    documentType: string;
    documentNumber: string;
    email: string;

    constructor(data: BasicUserDataInterface) {
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.birthDate = data.birthDate || '';
        this.documentType = data.documentType || '';
        this.documentNumber = data.documentNumber || '';
        this.email = data.email || '';
    }

    getBody() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            documentType: this.documentType,
            documentNumber: this.documentNumber,
            email: this.email
        }
    }
}
