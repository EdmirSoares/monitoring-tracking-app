import { useEffect, useState } from "react";
import * as Location from "expo-location";

export interface ICoord {
    latitude: number;
    longitude: number;
}

export default function useApp(currentRoute?: ICoord[]) {
    const [initialPosition, setInitialPosition] = useState<ICoord>();

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission not granted');
                    setInitialPosition({
                        latitude: -23.5505,
                        longitude: -46.6333,
                    });
                    return;
                }

                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                
                setInitialPosition({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.error('Error getting location:', error);
                setInitialPosition({
                    latitude: -23.5505,
                    longitude: -46.6333,
                });
            }
        };

        getCurrentLocation();
    }, []);

    useEffect(()=>{
        console.log("Initial Position:", initialPosition);
    },[initialPosition])

    return {
        currentRoute,
        initialPosition,
    };
}