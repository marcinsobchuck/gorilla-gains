interface RadioItem {
  labelText: string
  value: string
}

export interface RadioButtonGroupProps {
  items: RadioItem[]
  groupTitle: string
  name: string
}
