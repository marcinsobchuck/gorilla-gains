import { GroupBase } from "react-select"
import { AsyncProps } from "react-select/async"

import { Option } from "../Select/Select.types"

interface PropsAsync {
  labelText?: string
  name: string
}

export type AsyncSelectProps<IsMulti extends boolean = false> = PropsAsync &
  AsyncProps<Option, IsMulti, GroupBase<Option>>
