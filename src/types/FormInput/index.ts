export interface IFormField {
    field: string;
    label: string;
    placeholder: string;
    errorText: string;
    value: string;
    showError?: boolean;
    maxLength?: number;
    secureTextEntry?: boolean;
    keyboardType?: "email-address" | "default";
    onChangeText: (text: string) => void;
    onSubmitEditing: (text: string) => void;
    onShowPassword?: () => void;
}