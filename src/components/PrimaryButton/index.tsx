import React from 'react'
import { ButtonContainer, ButtonText } from './styles'

interface IPrimaryButton {
    onPress: () => void,
    disabled?: boolean
    label: string,
    fontSize: number,
    fontWeight?: string
    colorText?: string,
    colorButton?: string
}

const PrimaryButton = ({ onPress, disabled, label, fontSize, colorText, colorButton, fontWeight }: IPrimaryButton) => {

    return (
        <ButtonContainer color={colorButton} disabled={disabled} onPress={onPress} >
            <ButtonText fontSize={fontSize} color={colorText} fontWeight={fontWeight}>{label}</ButtonText>
        </ButtonContainer>
    )
}

export default PrimaryButton