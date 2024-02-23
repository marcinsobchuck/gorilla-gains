import { forwardRef, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { Controller, FieldErrors, FieldValues, useFormContext } from "react-hook-form"

import "react-datepicker/dist/react-datepicker.css"

import { FormError } from "@components/FormError/FormError"
import { Icon } from "@components/Icon/Icon"

import { DatePickerWrapper } from "./Datepicker.styled"
import { DatepickerProps } from "./Datepicker.types"

interface ReactDatePickerInputProps {
  id: string
  label: string
  withError?: boolean
  errors: FieldErrors<FieldValues>
}

const ReactDatePickerInput = forwardRef<
  HTMLInputElement,
  ReactDatePickerInputProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ errors, id, label, withError = "true", ...props }, ref) => {
  return (
    <>
      <input ref={ref} {...props} />
      <label htmlFor={id}>{label}</label>
      <Icon height={20} width={20} name='calendar' />
      {withError && <FormError errors={errors} name={id} />}
    </>
  )
})

export const Datepicker: React.FC<DatepickerProps> = ({ name, label }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const toggleCalendarOpen = () => setIsCalendarOpen((prev) => !prev)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ref, ...field } }) => (
        <DatePickerWrapper
          $isCalendarOpen={isCalendarOpen}
          $isFloating={isCalendarOpen || Boolean(value)}
        >
          <ReactDatePicker
            id={name}
            customInput={<ReactDatePickerInput id={name} ref={ref} label={label} errors={errors} />}
            selected={value}
            onCalendarOpen={toggleCalendarOpen}
            dateFormat='dd/MM/yyyy'
            onCalendarClose={toggleCalendarOpen}
            popperPlacement='bottom-end'
            minDate={new Date()}
            {...field}
          />
        </DatePickerWrapper>
      )}
    />
  )
}
