import { View, Text } from 'react-native'
import React from 'react'
import { Container } from './style'

interface IDefaultContainer {
  children: React.ReactNode,
  bgColor?: string
}

const DefaultContainer = ({ children, bgColor }: IDefaultContainer) => {
  return (
    <Container bgColor={bgColor ? bgColor : '#fff'}>
      {children}
    </Container>
  )
}

export default DefaultContainer