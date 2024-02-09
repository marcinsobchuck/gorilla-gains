import { GroupBase } from "react-select"
import { AsyncProps } from "react-select/async"

interface PropsAsync {
  labelText?: string
  name: string
}

export interface AsyncOption {
  value: string
  label: string
  [x: string]: unknown
}

export type AsyncSelectProps = PropsAsync & AsyncProps<AsyncOption, false, GroupBase<AsyncOption>>
