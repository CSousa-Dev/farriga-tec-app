import Api from "../Api"

export interface PasswordValidationInterface extends ServiceValidationDataInterface {
    service: 'PASSWORD'
    getBody(): {
        password: string
        passwordConfirmation: string
    }
}

export interface AddressDataValidationInterface extends ServiceValidationDataInterface {
    service: 'ADDRESS' 
    getBody(): {
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
}

export interface BasicUserDataValidationInterface extends ServiceValidationDataInterface {
    service: 'BASIC_USER_INFO';
    getBody(): {
        firstName: string
        lastName: string
        birthDate: string,
        documentType: string,
        documentNumber: string,
        email: string
    }
}

export interface ServiceValidationDataInterface {
    service: 'PASSWORD' | 'BASIC_USER_INFO' | 'ADDRESS'
    getBody(): Record<string, string>
}

export type ResponseFieldByFieldValidationType = {
    errors: Record<string,string[]>
    validatedFields: string[]
}


export async function validationService(validationData: BasicUserDataValidationInterface | AddressDataValidationInterface | PasswordValidationInterface): Promise<ResponseFieldByFieldValidationType | null> {
    const api = new Api()
    const response = await api.getInstance().post(`validation/${validationData.service}`, {fields: validationData.getBody()})
    return response.data
}
