import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
    flex: 1;
    margin-top: ${Platform.OS === 'ios' ? 0 : 30}px;
    align-items: center;
    padding: 8%;
    gap: 32px;
`

export const ImageContainerResult = styled.View`
    width: 100%;
    height: 30%;
    justifyContent: center;
    alignItems: center;
    overflow: hidden;
    marginBottom: 20px;
`

export const ImageContainer = styled.View`
    width: 100%;
    height: 20%;
    marginBottom: 20px;
    justifyContent: center;
    alignItems: center;
`

export const TextContainer = styled.View<{ paddingBottom?: number }>`
    width: 100%;
    flex-direction: row;
    gap: 16px;
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : 0}px;
`

export const TitleText = styled.Text<{ fontSize: number, fontWeight?: number }>`
    font-size: ${props => props.fontSize}px;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 700};
    color: #000000;
    align-text: center
`

export const SmallInfoText = styled.Text<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    font-weight: 400;
    color: #000000;
`

export const DescriptionText = styled.Text<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    font-weight: 500;
    color: #000000;
    text-align: lefet;
`