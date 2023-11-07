import { useFormContext } from "react-hook-form"

import { CheckboxTileInput, CheckboxTileLabel, CheckboxTileWrapper } from "./CheckboxTile.styled"
import { CheckboxTileProps } from "./CheckboxTile.types"

export const CheckboxTile: React.FC<CheckboxTileProps> = ({ name, value, label }) => {
  const { register } = useFormContext()
  return (
    <CheckboxTileWrapper>
      <CheckboxTileInput id={value} type='checkbox' value={value} {...register(name)} />
      <CheckboxTileLabel htmlFor={value}>{label}</CheckboxTileLabel>
    </CheckboxTileWrapper>
  )
}
