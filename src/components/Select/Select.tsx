/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Controller, useFormContext } from "react-hook-form"
import ReactSelect, { SingleValue } from "react-select"
import { useTheme } from "styled-components"

import { Control } from "./components/Control"
import { selectStyles } from "./Select.styles"
import { Option, SelectProps } from "./Select.types"

export const Select: React.FC<SelectProps> = ({ options, labelText, name }) => {
  const { control } = useFormContext()
  const theme = useTheme()

  return (
    <Controller
      name='activityLevel'
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <ReactSelect
          {...field}
          options={options}
          value={options.find((option) => option.value === value)}
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
        />
      )}
    />
  )
}
