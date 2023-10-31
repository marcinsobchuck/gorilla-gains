import { useFormContext, useWatch } from "react-hook-form"

import errorIcon from "@assets/error.svg"
import successIcon from "@assets/success.svg"

import {
  InputStatusIcon,
  InputWrapper,
  StyledError,
  StyledInput,
  StyledLabel,
} from "./Input.styled"
import { InputProps } from "./Input.types"

export const Input: React.FC<InputProps> = ({ id, type, label }) => {
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
      <StyledInput
        id={id}
        type={type}
        {...register(id, {
          ...(type === "number" && {
            setValueAs: (v) => (v === "" ? "" : +v),
          }),
        })}
      />
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
