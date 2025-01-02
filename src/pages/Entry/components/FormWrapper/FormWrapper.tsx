import { useNavigate } from "react-router-dom"
import { useTheme } from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Routes } from "@enums/routes.enum"

import { FormTitle, Wrapper } from "./FormWrapper.styled"
import { FormWrapperProps } from "./FormWrapper.types"

export const FormWrapper: React.FC<FormWrapperProps> = ({ formTitle, children }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <>
      <Icon
        name='leftArrow'
        isInteractive
        color={theme.secondary}
        onClick={() => navigate(Routes.LOGIN)}
      />
      <Wrapper>
        <FormTitle>{formTitle}</FormTitle>
        {children}
      </Wrapper>
    </>
  )
}
