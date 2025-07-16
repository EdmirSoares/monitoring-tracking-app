import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)<{ bgColor?: string }>`
    flex: 1;
    background-color:${props => props.bgColor ? props.bgColor : '#C5C5C5'};
    padding: 0% 4%;
`