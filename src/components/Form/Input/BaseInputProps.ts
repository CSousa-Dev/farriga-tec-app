import { TextStyle } from "react-native";

export default interface BaseInputProps {
    containerStyle?: TextStyle;
    label: string;
    type?: 'text' | 'date' | 'password';
    placeholder: string;
    onChange?: (text: string) => void;
    value?: string;
    keyboardType?: 'numeric' | 'default';
    validationErrors?: string[];
    format?: string;
    foccus?: boolean;
}