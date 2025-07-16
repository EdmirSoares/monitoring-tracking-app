import styled from "styled-components/native";

export const InputContainer = styled.View`
    width: 100%;
    height: 60px;
    margin-bottom: 38px;
`

export const PasswordInputContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border: 1px solid #D9D9D9;
    border-radius: 999px;
    padding-right: 5%;
`

export const Input = styled.TextInput<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    width: 100%;
    height: 100%;
    color: #000;
    font-weight: 400;
    background-color: #F2F2F2;
    border-radius: 8px;
    padding: 5%;
`
export const GenericActionInput = styled.TextInput<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    width: 90%;
    flex: 1;
    height: 100%;
    color: #000;
    font-weight: 400;
    border-radius: 8px;
    padding: 5%;
`
export const ErrorText = styled.Text<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    color: #FF0000;
    margin-left: 5%;
`
export const Label = styled.Text<{ fontSize: number }>`
    font-size: ${props => props.fontSize}px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 8px;
    margin-left: 4px;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`