import BaseInputProps from "./BaseInputProps";
import DateInput from "./DateInput";
import PasswordInput from "./PasswordInput";
import MaskedInput from "./MaskedInput";
import TextInput from "./TextInput";

export default function Input(props: BaseInputProps) {
    
    return (
        props.type === 'date'           && <DateInput {...props} />
        || props.type === 'password'    && <PasswordInput {...props} />
        || props.format                 && <MaskedInput {...props} format={props.format} />
        ||                                 <TextInput {...props} />
    )
}