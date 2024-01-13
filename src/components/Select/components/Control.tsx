/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ControlProps, components } from "react-select"

import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

import { Label } from "./Control.styled"
import { Option } from "../Select.types"

type ControlOptions = AsyncOption | Option

export const Control = <OptionType extends ControlOptions>(props: ControlProps<OptionType>) => {
  // @ts-ignore <- https://react-select.com/components
  const { labelText, name } = props.selectProps

  return (
    <>
      <Label
        htmlFor={name}
        $isFloating={props.isFocused || props.hasValue}
        $isEmpty={props.hasValue}
      >
        {labelText || "Select"}
      </Label>
      <components.Control {...props} />
    </>
  )
}

{
  /* <ControlProps<AsyncOption, false>> */
}
