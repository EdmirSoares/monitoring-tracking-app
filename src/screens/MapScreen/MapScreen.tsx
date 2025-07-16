import React, {useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Container } from "./styles";
import useApp, { ICoord } from "./useApp";
import { StatusBar } from "expo-status-bar";
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Polyline,
} from "react-native-maps";

type MapScreenProps = {
    currentRoute?: ICoord[];
};

export default function MapScreen({ currentRoute }: MapScreenProps) {
    const { initialPosition } = useApp(currentRoute);

    const mapRef = useRef<MapView>(null);

    const mapStyle = [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
    ];

    const mapLoaded = async () => {
        if (currentRoute && currentRoute.length > 1) {
            mapRef.current?.fitToSuppliedMarkers(
                ["finalPosition", "initialPosition"],
                {
                    edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                    },
                    animated: true,
                }
            );
        }
    };

        if (!initialPosition) {
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
        <Container>
            <StatusBar style="auto" />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                ref={mapRef}
                customMapStyle={mapStyle}
                showsBuildings={false}
                showsPointsOfInterest={false}
                region={{
                    latitude:
                        currentRoute && currentRoute?.length > 0
                            ? currentRoute[0].latitude
                            : initialPosition.latitude,
                    longitude:
                        currentRoute && currentRoute?.length > 0
                            ? currentRoute[0].longitude
                            : initialPosition.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onMapLoaded={mapLoaded}
            >
                <Marker
                    coordinate={{
                        latitude:
                            currentRoute && currentRoute?.length > 0
                                ? currentRoute[0].latitude
                                : -10.935652,
                        longitude:
                            currentRoute && currentRoute?.length > 0
                                ? currentRoute[0].longitude
                                : -37.075956,
                    }}
                    identifier="initialPosition"
                    title="Initial Position"
                />

                {currentRoute && currentRoute?.length > 1 && (
                    <>
                        <Marker
                            coordinate={{
                                latitude:
                                    currentRoute[currentRoute.length - 1].latitude,
                                longitude:
                                    currentRoute[currentRoute.length - 1].longitude,
                            }}
                            identifier="finalPosition"
                            title="final Position"
                            pinColor="green"
                        />
                        <Polyline
                            coordinates={currentRoute.map((coord) => ({
                                latitude: coord.latitude,
                                longitude: coord.longitude,
                            }))}
                            strokeWidth={5}
                            strokeColor="#000"
                            lineCap="round"
                            lineJoin="round"
                            zIndex={5}
                            strokeColors={["#000", "#000"]}
                        />
                    </>
                )}
            </MapView>
        </Container>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },
});
