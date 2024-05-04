import { ResponseFieldByFieldValidationType } from "../../../services/Validation/ResponseFieldByFieldValidationType";
import { validateBasicUserData } from "../../../services/Validation/validateBasicUserData";
import AbstractStep from "./AbstractStep";
import { InputType } from "./InputType";
import { StepObjectInterface } from "./StepObjectInterface";

export default class StepAddress extends AbstractStep implements StepObjectInterface
{
    public readonly title: string = 'Dados básicos.';
    public readonly description: string = 'Para iniciarmos precisamos de algumas informações básicas.';
    public readonly skip: boolean = false;
    public readonly notFilledMessage: string = 'Caso decida preencher o endereço, é necessário que preencha todos os campos exceto complemento e referência que são opcionais.';
    public readonly password: boolean = false;
    public readonly inputList: InputType[] = [
        {
            field: 'zipCode',
            label: 'cep',
            placeholder: 'Ex: xxxxx-xxx',
            format: '#####-###',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
            type: 'numeric'
        },
        {
            field: 'street',
            label: 'Rua',
            placeholder: 'Ex: Rua das Flores',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'number',
            label: 'Número',
            placeholder: 'Ex: 123',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'neighborhood',
            label: 'Bairro',
            placeholder: 'Ex: Jardim das Colheita',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'city',
            label: 'Cidade',
            placeholder: 'Ex: São Paulo',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'state',
            label: 'Estado - UF',
            placeholder: 'Ex: SP',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'country',
            label: 'País',
            placeholder: 'Brasil',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
        },
        {
            field: 'complement',
            label: 'Complemento',
            placeholder: 'Ex: Casa 1',
        },
        {
            field: 'reference',
            label: 'Referência',
            placeholder: 'Ex: Próximo ao mercado X',
        }
    ];

    async validateStep(): Promise<ResponseFieldByFieldValidationType | null> {
        try {
            let response = await validateBasicUserData({
                firstName: this.inputList[0].value || '',
                lastName: this.inputList[1].value || '',
                documentType: 'CPF',
                documentNumber: this.inputList[2].value || '',
                birthDate: this.inputList[3].value || '',
                email: this.inputList[4].value || ''
            })

            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    } 
}