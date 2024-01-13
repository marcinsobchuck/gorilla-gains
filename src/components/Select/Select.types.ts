import { GroupBase, Props } from "react-select"
export interface Option {
  value: string
  label: string
}

export interface SelectAdditionalProps {
  options: Option[]
  labelText?: string
  name: string
}

export type SelectProps = SelectAdditionalProps &
  React.HTMLAttributes<HTMLDivElement> &
  Props<Option, false, GroupBase<Option>>
