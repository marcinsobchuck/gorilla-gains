import { useTheme } from "styled-components"

import { Routes } from "@enums/routes.enum"

import { FormTitle, StyledButton, Wrapper } from "./FormWrapper.styled"
import { FormWrapperProps } from "./FormWrapper.types"

export const FormWrapper: React.FC<FormWrapperProps> = ({ formTitle, children }) => {
  const theme = useTheme()

  return (
    <>
      <StyledButton
        buttonType='navLink'
        to={Routes.LOGIN}
        iconColor={theme.secondary}
        icon='leftArrow'
        variant='tertiary'
      />

      <Wrapper>
        <FormTitle>{formTitle}</FormTitle>
        {children}
      </Wrapper>
    </>
  )
}
