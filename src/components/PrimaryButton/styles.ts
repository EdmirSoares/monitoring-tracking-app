import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity<{color?: string}>`
    width: 100%;
    padding: 12px;
    align-items: center;
    border-radius: 999px;
    background-color: ${props => props.color ? props.color : '#000'};
    overflow: hidden;
`

export const ButtonText = styled.Text< { fontSize?: number, color?: string, fontWeight?: string }>`
    font-size: ${props => props.fontSize}px;
    color: ${props => props.color ? props.color : '#fff'};
    font-weight: ${props => props.fontWeight ? props.fontWeight : '500'};
`