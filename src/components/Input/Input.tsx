import get from "lodash.get"
import { useFormContext, useWatch } from "react-hook-form"

import errorIcon from "@assets/error.svg"
import successIcon from "@assets/success.svg"
import { FormError } from "@components/FormError/FormError"

import { InputStatusIcon, InputWrapper, StyledInput, StyledLabel, UnitSymbol } from "./Input.styled"
import { InputProps } from "./Input.types"

export const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  withIcon = true,
  withError = true,
  unitSymbol,
  className,
  triggerValidationFor = [],
  onChange,
  isDisabled,
  children,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext()
  const formValues = useWatch({
    name: id,
    exact: true,
  })

  const error = get(errors, id)?.message?.toString()
  const isError = Boolean(error)

  const isNotEmpty = formValues !== undefined && formValues !== null && formValues !== ""

  const handleValidationTrigger = async () => {
    if (triggerValidationFor.length > 0) {
      await trigger(triggerValidationFor)
    }
  }

  const customOnChange = () => {
    onChange && onChange()
    handleValidationTrigger()
  }

  const renderStatusIcon = () => {
    if (!withIcon) return null

    return (
      <InputStatusIcon
        $isVisible={isError || isNotEmpty}
        $isValid={!isError}
        src={errors[id] ? errorIcon : successIcon}
      />
    )
  }

  return (
    <InputWrapper
      key={id}
      $shouldTransition={isNotEmpty}
      $withError={withError}
      className={className}
      $isDisabled={isDisabled}
    >
      <StyledInput
        id={id}
        type={type}
        step='any'
        {...register(id, {
          ...(type === "number" && {
            setValueAs: (v) => (v === "" ? "" : +v),
          }),
          onChange: customOnChange,
          onBlur: handleValidationTrigger,
        })}
        disabled={isDisabled}
        {...props}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      {renderStatusIcon()}
      {children}
      {unitSymbol && <UnitSymbol>{unitSymbol}</UnitSymbol>}
      {withError && <FormError errors={errors} name={id} />}
    </InputWrapper>
  )
}
