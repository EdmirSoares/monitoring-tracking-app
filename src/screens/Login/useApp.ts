import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/Navigation";
import { IFormField } from "../../types/FormInput";
import { AuthContext } from "../../Provider/Auth";

type DataFormKeys = "loginEmail" | "passwordEmail";

interface DataForm {
    loginEmail: string;
    passwordEmail: string;
}

export default function useApp() {
    const navigation = useNavigation<NavigationProps>();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [dataForm, setDataForm] = useState<DataForm>({
        loginEmail: "",
        passwordEmail: "",
    });

    const [errors, setErrors] = useState<Record<DataFormKeys, boolean>>({
        passwordEmail: false,
        loginEmail: false,
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChangeData = (value: string, field: DataFormKeys) => {
        if (field === "loginEmail") {
            setDataForm({ ...dataForm, [field]: value });
            setErrors({ ...errors, [field]: false });
        }
    };

    const handleSubmit = () => {
        const newErrors: Record<DataFormKeys, boolean> = { ...errors };

        if (
            dataForm.loginEmail.trim() === "" ||
            !validateEmail(dataForm.loginEmail)
        ) {
            newErrors.loginEmail = true;
        }

        if (password.trim() === "") {
            newErrors.passwordEmail = true;
        }

        setErrors(newErrors);

        const isFormValid = Object.values(newErrors).every((v) => !v);

        if (isFormValid) {
            navigation.replace("LocationRegister");
        }
    };

    const dataFieldsForm: IFormField[] = [
        {
            field: "loginEmail",
            label: "E-mail",
            placeholder: "Digite seu e-mail",
            errorText: "Email inválido",
            value: dataForm.loginEmail,
            onChangeText: (text: string) =>
                handleChangeData(text, "loginEmail"),
            onSubmitEditing: () => {},
            showError: errors.loginEmail,
            keyboardType: "email-address",
        },
        {
            field: "passwordEmail",
            label: "Senha",
            placeholder: "Agora digite sua senha",
            errorText: "Favor informar uma senha",
            value: password,
            onChangeText: (text: string) => {
                setPassword(text);
                setErrors({ ...errors, passwordEmail: false });
            },
            onSubmitEditing: () => {},
            onShowPassword: handleShowPassword,
            showError: errors.passwordEmail,
            secureTextEntry: !showPassword,
        },
    ];

    return {
        dataFieldsForm,
        showPassword,
        handleSubmit,
        handleShowPassword,
        error
    };
}
