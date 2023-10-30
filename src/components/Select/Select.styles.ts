import { StylesConfig } from "react-select"

import { Option } from "./Select.types"

export const selectStyles: StylesConfig<Option, false> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "grey" : "red",
  }),
}
