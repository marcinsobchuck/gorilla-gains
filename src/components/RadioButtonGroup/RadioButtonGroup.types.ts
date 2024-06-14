import { Align, Direction, Justify } from "@components/FlexContainer/FlexContainer.types"

export interface RadioItem {
  labelText: string
  value: string | number
  checked?: boolean
}

export interface RadioButtonGroupProps {
  items: RadioItem[]
  groupTitle?: string
  name: string
  buttonVariant?: "tile"
  className?: string
  withError?: boolean
  direction?: Direction
  align?: Align
  justify?: Justify
  gap?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
