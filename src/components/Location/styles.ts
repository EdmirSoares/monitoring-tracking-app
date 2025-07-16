import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
`;

export const Info = styled.View`
flex: 1;
`

export const Label = styled.Text<{ color?: string }>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.color || "#000"};
    margin-bottom: 8px;
`;
