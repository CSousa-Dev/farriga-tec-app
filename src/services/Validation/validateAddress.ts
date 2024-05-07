import { api } from "../api";
import { ResponseFieldByFieldValidationType } from "./ResponseFieldByFieldValidationType";

export interface AddressDataValidation extends Record<string, string> {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    country: string
    zipCode: string
    reference: string
}

export async function validateAddress(requestBody: AddressDataValidation): Promise<ResponseFieldByFieldValidationType | null> {
    try {
        console.log(requestBody)
        const response = await api.post('validation/address', {fields: requestBody})
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}