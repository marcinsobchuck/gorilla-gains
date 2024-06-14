import { useFormContext } from "react-hook-form"

import { TileInputButton } from "@components/TileInputButton/TileInputButton"

import { HiddenRadioInput, RadioButtonLabel, RadioButtonWrapper } from "./RadioButton.styled"
import { RadioButtonProps } from "./RadioButton.types"

export const RadioButton: React.FC<RadioButtonProps> = ({
  labelText,
  name,
  value,
  variant,
  onChange,
  checked,
}) => {
  const formContext = useFormContext()

  if (variant === "tile")
    return <TileInputButton type='radio' label={labelText} name={name} value={value} />

  return (
    <RadioButtonWrapper>
      <HiddenRadioInput
        id={`${name}-${value}`}
        type='radio'
        value={value}
        checked={checked}
        {...(formContext ? formContext.register(name) : { name })}
        {...(!formContext ? { onChange } : {})}
      />

      <RadioButtonLabel htmlFor={`${name}-${value}`}>{labelText}</RadioButtonLabel>
    </RadioButtonWrapper>
  )
}
