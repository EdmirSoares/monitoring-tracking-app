import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/Provider/Auth";
import Routes from "./src/routes";
import { FontSizeProvider } from "./src/Provider/Font";
import { CoordinatesProvider } from "./src/Provider/CoordinatesProvider";

//SplashScreen.preventAutoHideAsync();

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <FontSizeProvider>
                    <CoordinatesProvider>
                        <Routes />
                    </CoordinatesProvider>
                </FontSizeProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}
