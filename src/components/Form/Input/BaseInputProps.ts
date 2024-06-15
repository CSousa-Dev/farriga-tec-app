import { TextStyle } from "react-native";

export default interface BaseInputProps {
    containerStyle?: TextStyle;
    labelStyle?: TextStyle;
    label?: string;
    type?: 'text' | 'date' | 'password' | 'checkbox';
    placeholder: string;
    onChange?: (text: string) => void;
    onPress?: () => void;
    checked?: boolean;
    value?: string;
    keyboardType?: 'numeric' | 'default';
    validationErrors?: string[];
    format?: string;
    foccus?: boolean;
}