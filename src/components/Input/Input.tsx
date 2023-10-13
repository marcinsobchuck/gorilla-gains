import React from "react"
import { useFormContext, useWatch } from "react-hook-form"

import {
  InputStatusIcon,
  InputWrapper,
  StyledError,
  StyledInput,
  StyledLabel,
} from "./Input.styled"
import { InputProps } from "./Input.types"
import errorIcon from "../../assets/error.svg"
import successIcon from "../../assets/success.svg"

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, label }, ref) => {
    const {
      register,
      control,
      formState: { errors },
    } = useFormContext()

    const formValues = useWatch({ control })

    const isError = Boolean(errors[id])
    const isNotEmpty = formValues[id] !== ""

    return (
      <InputWrapper key={id} $shouldTransition={isNotEmpty}>
        <StyledInput id={id} type={type} {...register(id)} ref={ref} />
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <InputStatusIcon
          $isVisible={isError || isNotEmpty}
          $isValid={!isError}
          src={errors[id] ? errorIcon : successIcon}
        />
        <StyledError $isVisible={isError}>{errors[id]?.message?.toString()}</StyledError>
      </InputWrapper>
    )
  }
)
