/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Controller, useFormContext } from "react-hook-form"
import ReactSelect from "react-select"
import { useTheme } from "styled-components"

import { FormError } from "@components/FormError/FormError"

import { Control } from "./components/Control"
import { SelectWrapper, selectStyles } from "./Select.styles"
import { Option, SelectProps } from "./Select.types"

export const Select: React.FC<SelectProps> = ({
  options,
  labelText,
  name,
  className,
  withError = true,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const theme = useTheme()

  return (
    <SelectWrapper className={className} $withError={withError}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <ReactSelect
              options={options}
              styles={selectStyles<Option>(theme)}
              onChange={(selectedOption) => {
                onChange(selectedOption?.value)
              }}
              value={options.find((option) => option.value === value)}
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
      {withError && <FormError errors={errors} name={name} />}
    </SelectWrapper>
  )
}
