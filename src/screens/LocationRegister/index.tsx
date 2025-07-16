import React from "react";
import useApp from "./useApp";
import MapScreen from "../MapScreen/MapScreen";
import { useFontSizes } from "../../Provider/Font";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import {
    BottomButtonsContainer,
    BottomButtonsContent,
    BottomContent,
    BottomInfoContent,
    ButtonText,
    Container,
    ContentDropdown,
    DropdownContainer,
    FilterButton,
    InfoContent,
    PressableButton,
    PressableButtonIcon,
    PressableDropdown,
    PressableText,
    RowContainer,
    TopButtonsContainer,
} from "./styles";
import { FlatList, Pressable, View } from "react-native";

export default function LocationRegister() {
    const {
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
    } = useApp();
    const { extraSmall, small } = useFontSizes();
    return (
        <Container>
            <MapScreen currentRoute={currentRoute} />
            <TopButtonsContainer>
                <PressableButtonIcon
                    onPress={isTracking ? undefined : handleOpenSettings}
                    bgColor="rgba(0, 0, 0, 0.3)"
                    padding={10}
                    style={{
                        opacity: isTracking ? 0.5 : 1,
                    }}
                >
                    <ButtonText>
                        <Feather name="settings" size={20} color="#fff" />
                    </ButtonText>
                </PressableButtonIcon>

                {openSettings && (
                    <ContentDropdown>
                        <PressableDropdown onPress={handleOpenLocationSettings}>
                            <Feather name="map-pin" size={18} color="black" />
                            <PressableText fontSize={extraSmall}>
                                Localização
                            </PressableText>
                        </PressableDropdown>
                        <PressableDropdown onPress={() => handleLogout()}>
                            <Feather name="log-out" size={18} color="black" />
                            <PressableText fontSize={extraSmall}>
                                Sair
                            </PressableText>
                        </PressableDropdown>
                    </ContentDropdown>
                )}
            </TopButtonsContainer>

            <BottomButtonsContainer>
                <BottomContent>
                    <BottomInfoContent>
                        <RowContainer>
                            <InfoContent>
                                <PressableText fontSize={small}>
                                    0 min
                                </PressableText>
                                <PressableText fontSize={small}>
                                    |
                                </PressableText>
                                <PressableText fontSize={small}>
                                    0 km
                                </PressableText>
                                <PressableText fontSize={small}>
                                    |
                                </PressableText>
                                <PressableText fontSize={small}>
                                    0 km/h
                                </PressableText>
                            </InfoContent>
                        </RowContainer>
                    </BottomInfoContent>

                    <BottomButtonsContent>
                        {!isTracking ? (
                            <PressableButton
                                onPress={startBackgroundTracking}
                                bgColor="#07a389ff"
                            >
                                <ButtonText>Iniciar rastreamento</ButtonText>
                            </PressableButton>
                        ) : (
                            <PressableButton
                                onPress={() => stopBackgroundTracking(true)}
                                bgColor="#c29f03ff"
                                disabled={false}
                                style={{
                                    opacity:
                                        !coordinates || coordinates.length <= 1
                                            ? 0.5
                                            : 1,
                                }}
                            >
                                <ButtonText>Parar rastreamento</ButtonText>
                            </PressableButton>
                        )}
                    </BottomButtonsContent>
                </BottomContent>
            </BottomButtonsContainer>
        </Container>
    );
}
