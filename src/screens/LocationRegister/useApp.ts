import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as BackgroundTask from "expo-background-task";
import { Alert, Linking, Platform, ToastAndroid } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { AuthContext } from "../../Provider/Auth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/Navigation";
import { AppState } from "react-native";
import { haversineDistance } from "../../utils/haversineDistance";
import { useCoordinates } from "../../Provider/CoordinatesProvider";
import {
    Coordinate,
    ICoord,
    LocationTaskData,
    Shift,
    ShiftDetails,
} from "./backgroundTasks";

// ---------------------- Background Fetch ----------------------

const locationTaskName = "location-task";

TaskManager.defineTask<LocationTaskData>(
    locationTaskName,
    async ({ data: { locations }, error }) => {
        try {
            if (error) throw error;

            const stored = await AsyncStorage.getItem("@coordinatesStorage");
            const prevCoords: Coordinate[] = stored ? JSON.parse(stored) : [];

            const newCoords = locations
                .map((loc) => ({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    timestamp: new Date(
                        loc.timestamp - new Date().getTimezoneOffset() * 60000
                    ).toISOString(),
                }))
                .filter((newCoord) => {
                    if (prevCoords.length === 0) return true;
                    const lastStoredCoord = prevCoords[prevCoords.length - 1];
                    return haversineDistance(lastStoredCoord, newCoord) >= 5;
                });

            if (newCoords.length > 0) {
                const updatedCoords = [...prevCoords, ...newCoords];
                await AsyncStorage.setItem(
                    "@coordinatesStorage",
                    JSON.stringify(updatedCoords)
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                "Falha na tarefa em segundo plano",
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            return BackgroundTask.BackgroundTaskResult.Failed;
        }
        return BackgroundTask.BackgroundTaskResult.Success;
    }
);

export default function useApp() {
    const queueKey = "@coordinatesStorage";

    const { employeeId, logout } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProps>();

    const { setCoordinates, coordinates } = useCoordinates();

    const [filteredRoutes, setFilteredRoutes] = useState<Shift[] | null>(null);

    const [isTracking, setIsTracking] = useState(false);
    const isSending = useRef(false);
    const netInfo = useNetInfo();

    const [openSettings, setOpenSettings] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const [currentRoute, setCurrentRoute] = useState<ICoord[]>([]);
    // ---------------------- AsyncStorage ----------------------

    const saveQueueToStorage = async (coordinates: Coordinate[]) => {
        try {
            await AsyncStorage.setItem(queueKey, JSON.stringify(coordinates));
        } catch (error) {
            console.error("Erro ao salvar fila:", error);
        }
    };

    const loadCoords = async () => {
        try {
            const stored = await AsyncStorage.getItem("@coordinatesStorage");
            if (!stored) return;

            const rawCoords = JSON.parse(stored) as Coordinate[];
            if (!rawCoords.length) return;

            await AsyncStorage.removeItem("@coordinatesStorage");
            return rawCoords;
        } catch (error) {
            console.error("Failed to sync coordinates:", error);
        }
    };

    //----------------------- Dropdown Functions -----------------------

    const handleOpenSettings = () => {
        setOpenSettings(!openSettings);
    };
    const handleOpenLocationSettings = () => {
        Linking.openSettings();
        setOpenSettings(false);
    };
    const handleLogout = async () => {
        try {
            await stopBackgroundTracking(true);
            await unregisterBackgroundTaskAsync();
        } finally {
            logout();
            navigation.navigate("Login");
        }
    };

    // ---------------------- Send to backend ----------------------

    const sendCoordinatesToBackend = async (
        coordsToSend: Coordinate[],
        isEndShift: boolean = false
    ) => {
        if (!coordsToSend || coordsToSend.length === 0 || isSending.current)
            return;

        isSending.current = true;

        try {
            await AsyncStorage.removeItem("@coordinatesStorage");
            setCoordinates(null);
        } catch (error: any) {
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
        } finally {
            isSending.current = false;
        }
    };

    // ---------------------- Start/Stop Tracking ----------------------

    async function registerBackgroundTaskAsync() {
        return BackgroundTask.registerTaskAsync(locationTaskName);
    }

    async function unregisterBackgroundTaskAsync() {
        const tasks = await TaskManager.getRegisteredTasksAsync();
        const isTaskRegistered = tasks.some(
            (task) => task.taskName === locationTaskName
        );

        if (!isTaskRegistered) return;

        return BackgroundTask.unregisterTaskAsync(locationTaskName);
    }

    async function startBackgroundTracking() {
        try {
            try {
                await Location.stopLocationUpdatesAsync(locationTaskName);
            } catch {}

            const tasks = await TaskManager.getRegisteredTasksAsync();
            const isTaskRegistered = tasks.some(
                (task) => task.taskName === locationTaskName
            );
            if (!isTaskRegistered) {
                await registerBackgroundTaskAsync();
            }

            const loadedCoords = await loadCoords();
            if (loadedCoords && loadedCoords.length > 0) {
                setCoordinates((prev) =>
                    prev ? [...prev, ...loadedCoords] : loadedCoords
                );
            }

            const servicesEnabled = await Location.hasServicesEnabledAsync();
            if (!servicesEnabled) {
                Alert.alert(
                    "Serviços de Localização Desativados",
                    "Por favor, ative o GPS do dispositivo para iniciar o rastreamento.",
                    [
                        {
                            text: "Abrir configurações",
                            onPress: () => Linking.openSettings(),
                        },
                        { text: "Cancelar", style: "cancel" },
                    ]
                );
                return;
            }

            const { status: foregroundStatus } =
                await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus !== "granted") {
                throw new Error("Permissão de primeiro plano negada");
            }

            if (Platform.OS === "android") {
                const { status: backgroundStatus } =
                    await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus !== "granted") {
                    throw new Error("Permissão de background negada");
                }

                await Notifications.setNotificationChannelAsync(
                    "location-tracking",
                    {
                        name: "Location Tracking",
                        importance: Notifications.AndroidImportance.LOW,
                        sound: "default",
                    }
                );
            }

            const isLocationActive =
                await Location.hasStartedLocationUpdatesAsync(locationTaskName);
            if (!isLocationActive) {
                await Location.startLocationUpdatesAsync(locationTaskName, {
                    accuracy: Location.Accuracy.BestForNavigation,
                    distanceInterval: 0,
                    timeInterval: 10000,
                    showsBackgroundLocationIndicator: true,
                    foregroundService: {
                        notificationTitle: "Rastreamento de percurso ativo",
                        notificationBody:
                            "O app de monitoramento de percurso está ativo.",
                    },
                    pausesUpdatesAutomatically: false,
                    activityType: Location.ActivityType.OtherNavigation,
                });
            }

            setCoordinates(null);
            setIsTracking(true);
        } catch (error: any) {
            console.error("Falha ao iniciar rastreamento:", error);
            ToastAndroid.showWithGravity(
                "Permissão de localização negada, habilite-a nas configurações",
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            if (
                error.message.includes("permission") ||
                error.message.includes("permissão")
            ) {
                Alert.alert(
                    "Permissão necessária",
                    "Nas configurações do dispositivo, ative a permissão de localização para o aplicativo.",
                    [
                        {
                            text: "Abrir configurações",
                            onPress: () => Linking.openSettings(),
                        },
                        {
                            text: "Cancelar",
                            style: "cancel",
                        },
                    ]
                );
            }
        }
    }

    const stopBackgroundTracking = async (shouldUnregister = true) => {
        try {
            setIsTracking(false);

            let coordsToSend = coordinates || [];

            const loadedCoords = await loadCoords();
            if (loadedCoords && loadedCoords.length > 0) {
                coordsToSend = [...(coordsToSend || []), ...loadedCoords];
            }

            await Location.stopLocationUpdatesAsync(locationTaskName);

            if (shouldUnregister) {
                await unregisterBackgroundTaskAsync();
            }

            if (coordsToSend && coordsToSend.length > 1) {
                ToastAndroid.showWithGravity(
                    "Rastreamento parado e coordenadas enviadas com sucesso",
                    ToastAndroid.LONG,
                    ToastAndroid.TOP
                );
            }
        } catch (error) {
            console.error("Erro ao parar rastreamento:", error);
        }
    };
    //----------------------- Filter Routes -----------------------

    const handleOpenCloseFilter = () => {
        setOpenFilter(!openFilter);
    };

    // ---------------------- Effect Hooks ----------------------

    useEffect(() => {
        const handleAutoSend = async () => {
            if (
                isTracking &&
                coordinates &&
                coordinates.length >= 10 &&
                !isSending.current
            ) {
                await sendCoordinatesToBackend(coordinates);
            }
        };

        handleAutoSend();
    }, [coordinates, isTracking]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTracking) {
            interval = setInterval(async () => {
                const stored = await AsyncStorage.getItem(
                    "@coordinatesStorage"
                );
                if (stored) {
                    setCoordinates((prev) => {
                        const loaded = JSON.parse(stored) as Coordinate[];
                        const all = [...(prev || []), ...loaded];
                        const unique = Array.from(
                            new Map(
                                all.map((item) => [item.timestamp, item])
                            ).values()
                        );
                        unique.sort(
                            (a, b) =>
                                new Date(a.timestamp).getTime() -
                                new Date(b.timestamp).getTime()
                        );
                        return unique;
                    });
                }
            }, 15000);
        }

        return () => interval && clearInterval(interval);
    }, [isTracking]);

    useEffect(() => {
        if (netInfo.isConnected) {
            loadCoords();
        }
        if (!netInfo.isConnected) {
            if (coordinates && coordinates.length > 0) {
                saveQueueToStorage(coordinates);
            }
        }
    }, [netInfo.isConnected]);

    useEffect(() => {
        const initBackgroundTask = async () => {
            try {
                await registerBackgroundTaskAsync();
            } catch (error) {
                console.error("Falha ao registrar a background task:", error);
            }
        };

        initBackgroundTask();

        return () => {};
    }, []);

    return {
        startBackgroundTracking,
        stopBackgroundTracking,
        handleLogout,
        handleOpenLocationSettings,
        handleOpenSettings,
        isTracking,
        openSettings,
        currentRoute,
        filteredRoutes,
        handleOpenCloseFilter,
        openFilter,
        coordinates,
    };
}
