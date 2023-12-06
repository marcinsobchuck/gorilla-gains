import { useFormContext } from "react-hook-form"

import { TextareaInput, TextareaLabel, TextareaWrapper } from "./Textarea.styled"
import { TextareaProps } from "./Textarea.types"

export const Textarea: React.FC<TextareaProps> = ({ name, label, placeholder }) => {
  const { register } = useFormContext()
  return (
    <TextareaWrapper>
      <TextareaLabel htmlFor={name}>{label}</TextareaLabel>
      <TextareaInput id={name} placeholder={placeholder} {...register(name)} />
    </TextareaWrapper>
  )
}
