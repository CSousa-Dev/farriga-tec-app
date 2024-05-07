import { api } from "../api";
import { ResponseFieldByFieldValidationType } from "./ResponseFieldByFieldValidationType";

export interface BasicUserDataValidation extends Record<string, string> {
    firstName: string
    lastName: string
    birthDate: string,
    documentType: string,
    documentNumber: string,
    email: string
}

export async function validateBasicUserData(requestBody: BasicUserDataValidation): Promise<ResponseFieldByFieldValidationType | null> {
    try {
        const response = await api.post('validation/basic_user_info', {fields: requestBody})
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}