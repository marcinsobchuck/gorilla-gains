/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Controller, useFormContext } from "react-hook-form"
import { SingleValue } from "react-select"
import ReactSelectAsync from "react-select/async"
import { useTheme } from "styled-components"

import { Control } from "@components/Select/components/Control"
import { selectStyles } from "@components/Select/Select.styles"
import { Option } from "@components/Select/Select.types"

import { AsyncSelectProps } from "./SelectAsync.types"

export const SelectAsync: React.FC<AsyncSelectProps> = ({
  labelText,
  name,
  className,
  ...rest
}) => {
  const { control } = useFormContext()
  const theme = useTheme()

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <ReactSelectAsync
              styles={selectStyles(theme)}
              onChange={(selectedOption: SingleValue<Option>) => {
                onChange(selectedOption?.value)
              }}
              components={{ Control }}
              openMenuOnFocus
              // @ts-ignore <- https://react-select.com/components
              labelText={labelText}
              name={name}
              inputId={name}
              placeholder=''
              {...rest}
            />
          )
        }}
      />
    </div>
  )
}
