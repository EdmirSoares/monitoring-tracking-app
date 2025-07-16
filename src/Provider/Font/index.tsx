import React, { createContext, useContext, ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";

// Define font sizes once
const fontSizes = {
    stupidlyLarge: RFValue(36),
    extraordinaryLarge: RFValue(32),
    extraExtraLarge: RFValue(24),
    extraLarge: RFValue(20),
    large: RFValue(18),
    medium: RFValue(16),
    small: RFValue(14),
    extraSmall: RFValue(12),
    tiny: RFValue(10),
    extraTiny: RFValue(8),
};

type FontSizeContextType = typeof fontSizes;

const FontSizeContext = createContext<FontSizeContextType | null>(null);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <FontSizeContext.Provider value={fontSizes}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSizes = () => {
    const context = useContext(FontSizeContext);
    if (!context) {
        throw new Error("useFontSizes must be used within a FontSizeProvider");
    }
    return context;
};
