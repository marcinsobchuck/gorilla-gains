/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Controller, useFormContext } from "react-hook-form"
import ReactSelect from "react-select"
import { useTheme } from "styled-components"

import { Control } from "./components/Control"
import { selectStyles } from "./Select.styles"
import { Option, SelectProps } from "./Select.types"

export const Select: React.FC<SelectProps> = ({ options, labelText, name, className, ...rest }) => {
  const { control } = useFormContext()
  const theme = useTheme()

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <ReactSelect
            options={options}
            styles={selectStyles<Option>(theme)}
            onChange={(selectedOption) => {
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
        )}
      />
    </div>
  )
}
