export type InputType = {
    field: string,
    label: string,
    placeholder: string
    password?: boolean
    value?: string
    erros?: string[]
    format?: string
    type?: 'text' | 'date' | 'password'
    keyboardType?: 'numeric' | 'default'
    required?: boolean
    requiredIfNotEmpty?: string[]
}
