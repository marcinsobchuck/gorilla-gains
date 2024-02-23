import { GroupBase, Props } from "react-select"
export interface Option {
  value: string
  label: string
}

export interface SelectAdditionalProps {
  options: Option[]
  name: string
  labelText?: string
  withError?: boolean
}

export type SelectProps = SelectAdditionalProps &
  React.HTMLAttributes<HTMLDivElement> &
  Props<Option, false, GroupBase<Option>>
