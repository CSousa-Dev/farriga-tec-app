import  Api  from "../Api";

export interface RegisterAccountRequestInterface {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    plainPassword: string;
    address?: {
        zipCode: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        country: string;
        complement: string;
        reference: string;
    }
    document: {
        number: string;
        type: string;
    }
}

interface ApiMappedError {
    code: string;
    message: string;
}

export default async function registerAccount(requestBody: RegisterAccountRequestInterface) : Promise<null | ApiMappedError> {
    const api = new Api();
    const response = await api.getInstance().post('account',requestBody);
    if(response.status === 200) return null;
    return response.data;
}