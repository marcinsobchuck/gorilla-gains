import { useFormContext } from "react-hook-form"

import { Icon } from "@components/Icon/Icon"

import { CheckboxInput, CheckboxLabel, CheckmarkWrapper } from "./Checkbox.styled"
import { CheckboxProps } from "./Checkbox.types"

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  className,
  width = 32,
  height = 32,
  iconHeight = 14,
  iconWidth = 14,
  borderRadius = 9,
}) => {
  const formContext = useFormContext()
  return (
    <CheckboxLabel htmlFor={name} className={className}>
      <CheckboxInput id={name} type='checkbox' {...(formContext && formContext.register(name))} />
      <CheckmarkWrapper $width={width} $height={height} $borderRadius={borderRadius}>
        <Icon name='checkmark' height={iconHeight} width={iconWidth} isInteractive />
      </CheckmarkWrapper>
      {label}
    </CheckboxLabel>
  )
}
