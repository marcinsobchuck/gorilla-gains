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
  onChange,
  value,
  ...rest
}) => {
  const context = useFormContext()
  const theme = useTheme()

  const renderContent = context ? (
    <Controller
      name={name}
      control={context.control}
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
  ) : (
    <ReactSelect
      options={options}
      styles={selectStyles<Option>(theme)}
      onChange={(selectedOption) => {
        onChange && onChange(selectedOption?.value)
      }}
      value={value}
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

  return (
    <SelectWrapper className={className} $withError={withError}>
      {renderContent}
      {withError && context && <FormError errors={context.formState.errors} name={name} />}
    </SelectWrapper>
  )
}
