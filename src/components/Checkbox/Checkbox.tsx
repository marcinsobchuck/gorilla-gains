import { useFormContext } from "react-hook-form"

import { Icon } from "@components/Icon/Icon"

import { CheckboxInput, CheckboxLabel, CheckmarkWrapper } from "./Checkbox.styled"
import { CheckboxProps } from "./Checkbox.types"

export const Checkbox: React.FC<CheckboxProps> = ({ name, label, className }) => {
  const formContext = useFormContext()
  return (
    <CheckboxLabel htmlFor={name} className={className}>
      <CheckboxInput id={name} type='checkbox' {...(formContext && formContext.register(name))} />
      <CheckmarkWrapper>
        <Icon name='checkmark' height={14} width={14} />
      </CheckmarkWrapper>
      {label}
    </CheckboxLabel>
  )
}
