import { Controller, useFormContext } from "react-hook-form"
import ReactSelect, { SingleValue } from "react-select"

import { selectStyles } from "./Select.styles"
import { Option, SelectProps } from "./Select.types"

export const Select: React.FC<SelectProps> = ({ options }) => {
  const { control } = useFormContext()

  return (
    <>
      <label id='aria-label' htmlFor='activityLevel'>
        Activity level
      </label>
      <Controller
        name='activityLevel'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <ReactSelect
            {...field}
            options={options}
            value={options.find((option) => option.value === value)}
            styles={selectStyles}
            onChange={(selectedOption: SingleValue<Option>) => {
              onChange(selectedOption?.value)
            }}
            inputId='activityLevel'
          />
        )}
      />
    </>
  )
}
