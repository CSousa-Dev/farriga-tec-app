import { ResponseFieldByFieldValidationType } from "../../../services/Validation/ResponseFieldByFieldValidationType";
import { validateBasicUserData } from "../../../services/Validation/validateBasicUserData";
import AbstractStep from "./AbstractStep";
import { InputType } from "./InputType";
import { StepObjectInterface } from "./StepObjectInterface";

export default class StepBasicUserData extends AbstractStep implements StepObjectInterface
{
    public readonly title: string = 'Dados básicos.';
    public readonly description: string = 'Para iniciarmos precisamos de algumas informações básicas.';
    public readonly skip: boolean = false;
    public readonly notFilledMessage: string = 'Preencha todos os campos obrigatórios.';
    public readonly password: boolean = false;
    public readonly inputList: InputType[] = [
        {
            field: 'firstName',
            label: 'Nome',
            placeholder: 'Informe seu primeiro nome aqui.',
            required: true,
        },
        {
            field: 'lastName',
            label: 'Sobrenome',
            placeholder: 'Informe seu sobrenome aqui.',
            required: true
        },
        {
            field: 'document',
            label: 'CPF',
            placeholder: 'Informe o número do seu CPF.',
            format: '###.###.###-##',
            type: 'numeric',
            required: true
        },
        {
            field: 'birthDate',
            label: 'Data de nascimento',
            placeholder: 'Informe sua data de nascimento.',
            type: 'date',
            required: true
        },
        {
            field: 'email',
            label: 'E-mail',
            placeholder: 'Informe o seu e-mail.',
            required: true
        }
    ];

    async validateStep(): Promise<ResponseFieldByFieldValidationType | null> {
        console.log({
            firstName: this.inputList[0].value || '',
            lastName: this.inputList[1].value || '',
            documentType: 'CPF',
            documentNumber: this.inputList[2].value || '',
            birthDate: this.inputList[3].value || '',
            email: this.inputList[4].value || ''})
        
        
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