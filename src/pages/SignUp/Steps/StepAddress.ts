import { ResponseFieldByFieldValidationType } from "../../../services/Validation/ResponseFieldByFieldValidationType";
import { AddressDataValidation, validateAddress } from "../../../services/Validation/validateAddress";
import { validateBasicUserData } from "../../../services/Validation/validateBasicUserData";
import AbstractStep from "./AbstractStep";
import { InputType } from "./InputType";
import { StepObjectInterface } from "./StepObjectInterface";

export default class StepAddress extends AbstractStep implements StepObjectInterface
{
    public readonly title: string = 'Dados básicos.';
    public readonly description: string = 'Agora vamos cadastrar seu endereço.';
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
            keyboardType: 'numeric'
        },
        {
            field: 'street',
            label: 'Rua',
            placeholder: 'Ex: Rua das Flores',
            requiredIfNotEmpty: ['zipCode','street', 'number', 'neighborhood', 'city', 'state', 'country', 'complement', 'reference'],
            type: 'password'
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

    validationIsRequired(): boolean {
        return this.someFieldIsFilled();
    }

    someFieldIsFilled(): boolean {
        return this.inputList.some((input) => {
            return !this.inputIsEmpty(input);
        });
    }

    validationService(): Promise<ResponseFieldByFieldValidationType | null> {
        return validateAddress(this.getCurrentValidationSet());
    }

    getCurrentValidationSet(): AddressDataValidation {
        return {
            zipCode: this.inputList[0].value || '',
            street: this.inputList[1].value || '',
            number: this.inputList[2].value || '',
            neighborhood: this.inputList[3].value || '',
            city: this.inputList[4].value || '',
            state: this.inputList[5].value || '',
            country: this.inputList[6].value || '',
            complement: this.inputList[7].value || '',
            reference: this.inputList[8].value || ''
        }
    }
}