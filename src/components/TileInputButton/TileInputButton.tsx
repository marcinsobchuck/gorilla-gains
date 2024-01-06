import { useFormContext } from "react-hook-form"

import {
  TileInputButtonInput,
  TileInputButtonLabel,
  TileInputButtonWrapper,
} from "./TileInputButton.styled"
import { TileInputButtonProps } from "./TileInputButton.types"

export const TileInputButton: React.FC<TileInputButtonProps> = ({
  name,
  value,
  label,
  type = "checkbox",
}) => {
  const { register } = useFormContext()
  return (
    <TileInputButtonWrapper>
      <TileInputButtonInput id={`${name}-${value}`} type={type} value={value} {...register(name)} />
      <TileInputButtonLabel htmlFor={`${name}-${value}`}>{label}</TileInputButtonLabel>
    </TileInputButtonWrapper>
  )
}
