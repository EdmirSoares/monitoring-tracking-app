import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
} from "react-native";
import DefaultContainer from "../../components/DefaultContainer";
import { useFontSizes } from "../../Provider/Font";
import FormInput from "../../components/FormInput";
import Logo from "../../../assets/images/logo/logo.png";
import useApp from "./useApp";
import { Container, ImageContainer } from "./style";
import PrimaryButton from "../../components/PrimaryButton";

const Login = () => {
    const { medium } = useFontSizes();
    const { showPassword, dataFieldsForm, handleSubmit, error } = useApp();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
            <DefaultContainer bgColor={"#fff"}>
                <Container>
                    <ImageContainer>
                        <Image
                            source={Logo}
                            resizeMode="contain"
                            style={{ flexShrink: 1, maxWidth: "50%" }}
                        />
                    </ImageContainer>

                    <View
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {dataFieldsForm.map((item, index) => (
                            <FormInput
                                key={index}
                                placeholder={item.placeholder}
                                label={item.label}
                                errorText={item.errorText}
                                showError={item.showError}
                                value={item.value}
                                maxLength={item.maxLength}
                                onChangeText={item.onChangeText}
                                onSubmitEditing={item.onSubmitEditing}
                                secureTextEntry={item.secureTextEntry}
                                onShowPassword={item.onShowPassword}
                                toggleIcon={showPassword}
                                keyboardType={item.keyboardType}
                            />
                        ))}
                    </View>
                    <PrimaryButton
                        onPress={handleSubmit}
                        label="Confirmar"
                        fontSize={medium}
                        colorText="#fff"
                        disabled={false}
                        colorButton="#00067F"
                    />
                </Container>
            </DefaultContainer>
        </KeyboardAvoidingView>
    );
};

export default Login;
