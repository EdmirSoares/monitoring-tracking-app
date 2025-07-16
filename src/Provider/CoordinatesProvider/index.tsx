import React, { createContext, useContext, ReactNode, useState } from "react";
import { Coordinate } from "../../screens/LocationRegister/backgroundTasks";

interface ICoordinatesProvider {
    coordinates: Coordinate[] | null;
    setCoordinates: (
        coords: 
            | Coordinate[] | null 
            | ((prev: Coordinate[] | null) => Coordinate[] | null)
    ) => void;
}

const CoordinatesContext = createContext<ICoordinatesProvider | null>(null);

export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
    const [coordinates, setCoordinates] = useState<Coordinate[] | null>(null);
    return (
        <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
            {children}
        </CoordinatesContext.Provider>
    );
};

export const useCoordinates = () => {
    const context = useContext(CoordinatesContext);
    if (!context) {
        throw new Error("useCoordinates must be used within a CoordinatesProvider");
    }
    return context;
};
