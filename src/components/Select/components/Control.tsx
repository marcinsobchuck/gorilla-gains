/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ControlProps, components } from "react-select"

import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

import { Label } from "./Control.styled"
import { Option } from "../Select.types"

type ControlOptions = AsyncOption | Option

export const Control = <OptionType extends ControlOptions>(props: ControlProps<OptionType>) => {
  // @ts-ignore <- https://react-select.com/components
  const { labelText, name } = props.selectProps
  const isFloating =
    props.getValue().length !== 0 ? props.getValue()[0].value !== "" : props.hasValue
  return (
    <>
      <Label htmlFor={name} $isFloating={props.isFocused || isFloating}>
        {labelText || "Select"}
      </Label>
      <components.Control {...props} />
    </>
  )
}

{
  /* <ControlProps<AsyncOption, false>> */
}
