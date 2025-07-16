import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getUserIdFromToken } from "../../utils/jwt_decode";

interface IAuthContextData {
    loading: boolean;
    logged: boolean;
    employeeId: string;
    signIn: (email: string, password: string) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeId, setEmployeeId] = useState<string>("");

    const isAuthenticated = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("@token");
            const employeeId = await AsyncStorage.getItem("@employeeId");
            const timeStampToken = await AsyncStorage.getItem(
                "@timeStampToken"
            );

            if (timeStampToken) {
                const timeStamp = new Date(timeStampToken).getTime();
                const currentTime = new Date().getTime();
                const diff = currentTime - timeStamp;
                const diffInMinutes = Math.floor(diff / 1000 / 60);
                if (diffInMinutes > 720) {
                    await AsyncStorage.removeItem("@token");
                    await AsyncStorage.removeItem("@employeeId");
                    await AsyncStorage.removeItem("shiftId");
                    setLogged(false);
                    return;
                }
            }

            if (!timeStampToken) {
                await AsyncStorage.removeItem("@token");
                await AsyncStorage.removeItem("@employeeId");
                await AsyncStorage.removeItem("shiftId");
                setLogged(false);
                return;
            }

            if (!token) {
                setLogged(false);
                return;
            }

            if (!employeeId) {
                setLogged(false);
                return;
            }

            setEmployeeId(employeeId);
            setLogged(true);
        } catch (error) {
            console.log("Erro ao verificar autenticação:", error);
            setLogged(false);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                "https://api.monitoramento-example.com/auth/login",
                {
                    email: email,
                    password: password,
                }
            );

            if (response.status === 201) {
                await Promise.all([
                    AsyncStorage.setItem("@token", response.data.access_token),
                    AsyncStorage.setItem(
                        "@employeeId",
                        getUserIdFromToken(response.data.access_token)
                    ),
                    AsyncStorage.setItem(
                        "@timeStampToken",
                        new Date().toString()
                    ),
                ]);

                const id = getUserIdFromToken(response.data.access_token);
                setEmployeeId(id);
                setLogged(true);
            }
            return response;
        } catch (error: any) {
            setLogged(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("@token");
            await AsyncStorage.removeItem("@employeeId");
            await AsyncStorage.removeItem("@timeStampToken");
            await AsyncStorage.removeItem("shiftId");
            setLogged(false);
        } catch (error: any) {
            console.error(error.message || "Logout failed");
            setLogged(true);
        }
    };

    useEffect(() => {
        isAuthenticated();
    }, []);

    return (
        <AuthContext.Provider
            value={{ signIn, logout, loading, logged, employeeId }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
