import { useFormContext } from "react-hook-form"

import { HiddenRadioInput, RadioButtonLabel, RadioButtonWrapper } from "./RadioButton.styled"
import { RadioButtonProps } from "./RadioButton.types"

export const RadioButton: React.FC<RadioButtonProps> = ({ labelText, name, value }) => {
  const { register } = useFormContext()
  return (
    <RadioButtonWrapper>
      <HiddenRadioInput id={value} type='radio' value={value} {...register(name)} />

      <RadioButtonLabel htmlFor={value}>{labelText}</RadioButtonLabel>
    </RadioButtonWrapper>
  )
}
