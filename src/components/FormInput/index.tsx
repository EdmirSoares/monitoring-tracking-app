import React from "react";
import {
    ErrorText,
    InputContainer,
    Label,
    GenericActionInput,
    PasswordInputContainer,
} from "./style";
import Feather from "@expo/vector-icons/Feather";
import { useFontSizes } from "../../Provider/Font";
import { KeyboardTypeOptions} from "react-native";

interface IFormInput {
    placeholder: string;
    label: string;
    errorText?: string;
    value: string;
    showError?: boolean;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    toggleIcon?: boolean;
    isDrowpdown?: boolean;
    isDisabled?: boolean;
    onChangeText: (text: string) => void;
    onSubmitEditing: (text: string) => void;
    onShowPassword?: () => void;
    onSearchCEP?: () => void;
    onBlur?: () => void;
}

const FormInput = ({
    placeholder,
    label,
    errorText,
    value,
    showError,
    maxLength,
    keyboardType,
    secureTextEntry,
    toggleIcon,
    isDisabled,
    onChangeText,
    onSubmitEditing,
    onShowPassword,
    onBlur,
}: IFormInput) => {
    const { small, extraSmall } = useFontSizes();

    return (
        <InputContainer>
            <Label fontSize={small}>{label}</Label>
            {onShowPassword ? (
                <>
                    <PasswordInputContainer>
                        <GenericActionInput
                            fontSize={small}
                            placeholder={placeholder}
                            value={value}
                            maxLength={maxLength ? maxLength : 100}
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="done"
                            onSubmitEditing={() => onSubmitEditing(value)}
                            onChangeText={(text) => onChangeText(text)}
                            secureTextEntry={secureTextEntry}
                            onBlur={onBlur}
                        />
                        <Feather
                            name={toggleIcon ? "eye" : "eye-off"}
                            size={20}
                            color={toggleIcon ? "#db2d27" : "gray"}
                            onPress={onShowPassword}
                        />
                    </PasswordInputContainer>
                    {showError && (
                        <ErrorText fontSize={extraSmall}>{errorText}</ErrorText>
                    )}
                </>
            ) : (
                <>
                    <PasswordInputContainer>
                        <GenericActionInput
                            fontSize={small}
                            placeholder={placeholder}
                            value={value}
                            maxLength={maxLength ? maxLength : 100}
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType={keyboardType ? keyboardType : "default"}
                            returnKeyType="done"
                            onSubmitEditing={() => onSubmitEditing(value)}
                            onChangeText={(text) => onChangeText(text)}
                            secureTextEntry={secureTextEntry}
                            onBlur={onBlur}
                            editable={!isDisabled}
                        />
                    </PasswordInputContainer>
                    {showError && (
                        <ErrorText fontSize={extraSmall}>{errorText}</ErrorText>
                    )}
                </>
            )}
        </InputContainer>
    );
};

export default FormInput;
