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
  onChange?: (selectedOption?: string) => void
  value?: Option
}

export type SelectProps = SelectAdditionalProps &
  React.HTMLAttributes<HTMLDivElement> &
  Props<Option, false, GroupBase<Option>>
