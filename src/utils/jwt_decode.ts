import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    sub: string;
    exp?: number;
    iat?: number;
}

export const getUserIdFromToken = (token: string): string => {
    try {
        if (!token) return "";

        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.sub;
    } catch (error) {
        console.error("Error decoding token:", error);
        return "";
    }
};
