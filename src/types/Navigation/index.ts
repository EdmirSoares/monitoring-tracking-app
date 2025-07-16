import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Login: undefined;
    LocationRegister: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;