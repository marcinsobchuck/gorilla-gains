interface RadioItem {
  labelText: string
  value: string | number
}

export interface RadioButtonGroupProps {
  items: RadioItem[]
  groupTitle?: string
  name: string
  buttonVariant?: "tile"
  className?: string
}
