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

export const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  withIcon = true,
  withError = true,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const formValues = useWatch({
    name: id,
    exact: true,
  })
  const isError = Boolean(errors[id])

  const isNotEmpty = formValues !== undefined && formValues !== null && formValues !== ""

  return (
    <InputWrapper key={id} $shouldTransition={isNotEmpty} className={className}>
      <StyledInput
        id={id}
        type={type}
        {...register(id, {
          ...(type === "number" && {
            setValueAs: (v) => (v === "" ? "" : +v),
          }),
        })}
        {...props}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      {withIcon && (
        <InputStatusIcon
          $isVisible={isError || isNotEmpty}
          $isValid={!isError}
          src={errors[id] ? errorIcon : successIcon}
        />
      )}
      {withError && (
        <StyledError $isVisible={isError}>{errors[id]?.message?.toString()}</StyledError>
      )}
    </InputWrapper>
  )
}
