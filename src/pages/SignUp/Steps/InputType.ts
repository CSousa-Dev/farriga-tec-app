export type InputType = {
    field: string,
    label: string,
    placeholder: string
    password?: boolean
    value?: string
    erros?: string[]
    format?: string
    type?: 'text' | 'numeric' | 'date'
    required?: boolean
    requiredIfNotEmpty?: string[]
}
