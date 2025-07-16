import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../Provider/Auth";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import Login from "../screens/Login";
import LocationRegister from "../screens/LocationRegister";

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();
    const { logged, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={logged ? "LocationRegister" : "Login"}
            screenOptions={{ headerShown: false }}
        >
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="LocationRegister"
                component={LocationRegister}
            />
        </Stack.Navigator>
    );
}
