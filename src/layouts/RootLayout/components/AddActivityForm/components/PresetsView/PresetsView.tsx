import React from "react"
import { useTheme } from "styled-components"

import { Heading } from "@components/Modal/Modal.styled"

import { StyledIcon, Wrapper } from "./PresetsView.styled"
import { PresetsViewProps } from "./PresetsView.types"
import { ActivityCard } from "../ActivityCard/ActivityCard"

export const PresetsView: React.FC<PresetsViewProps> = ({ isVisible, setIsPresetsVisible }) => {
  const theme = useTheme()

  if (!isVisible) return null

  return (
    <Wrapper>
      <StyledIcon
        name='leftArrow'
        onClick={() => {
          setIsPresetsVisible(false)
        }}
        color={theme.secondary}
      />
      <Heading>Add from preset</Heading>
      <ActivityCard />
    </Wrapper>
  )
}
