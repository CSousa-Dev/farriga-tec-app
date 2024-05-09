import AddressInterface from "../../Interfaces/Domain/Account/AddressInterface";
import { AddressDataValidationInterface } from "./validationService";

export class AddressDataValidation implements AddressDataValidationInterface {
    
    public readonly service = "ADDRESS"
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    reference: string;

    constructor(data: AddressInterface) {
        this.street = data.street || '';
        this.number = data.number || '';
        this.complement = data.complement || '';
        this.neighborhood = data.neighborhood || '';
        this.city = data.city || '';
        this.state = data.state || '';
        this.country = data.country || '';
        this.zipCode = data.zipCode || '';
        this.reference = data.reference || '';
    }

    getBody() {
        return {
            street: this.street,
            number: this.number,
            complement: this.complement,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state,
            country: this.country,
            zipCode: this.zipCode,
            reference: this.reference
        }
    }
}