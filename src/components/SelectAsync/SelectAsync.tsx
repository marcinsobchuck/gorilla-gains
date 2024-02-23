/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, useFormContext } from "react-hook-form"
import ReactSelectAsync from "react-select/async"
import { useTheme } from "styled-components"

import { FormError } from "@components/FormError/FormError"
import { Control } from "@components/Select/components/Control"
import { SelectWrapper, selectStyles } from "@components/Select/Select.styles"

import { AsyncOption, AsyncSelectProps } from "./SelectAsync.types"

export const SelectAsync: React.FC<AsyncSelectProps> = ({
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
        render={({ field: { onChange } }) => {
          return (
            <ReactSelectAsync
              styles={selectStyles<AsyncOption>(theme)}
              onChange={(selectedOption) => {
                onChange(selectedOption)
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
      {withError && <FormError errors={errors} name={name} />}
    </SelectWrapper>
  )
}
