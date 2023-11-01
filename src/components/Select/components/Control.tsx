/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ControlProps, components } from "react-select"

import { Label } from "./Control.styled"
import { Option } from "../Select.types"

export const Control: React.FC<ControlProps<Option, false>> = ({ ...props }) => {
  // @ts-ignore <- https://react-select.com/components
  const { labelText } = props.selectProps

  return (
    <>
      <Label $isFloating={props.isFocused || props.hasValue} $isEmpty={props.hasValue}>
        {labelText || "Select"}
      </Label>
      <components.Control {...props} />
    </>
  )
}
