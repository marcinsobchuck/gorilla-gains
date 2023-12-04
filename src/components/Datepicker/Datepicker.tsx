import { forwardRef, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { Controller, useFormContext } from "react-hook-form"

import "react-datepicker/dist/react-datepicker.css"

import { Icon } from "@components/Icon/Icon"

import { DatePickerWrapper } from "./Datepicker.styled"
import { DatepickerProps } from "./Datepicker.types"

interface ReactDatePickerInputProps {
  id: string
  label: string
}

const ReactDatePickerInput = forwardRef<
  HTMLInputElement,
  ReactDatePickerInputProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => (
  <>
    <input ref={ref} {...props} />
    <label htmlFor={props.id}>{props.label}</label>
    <Icon height={20} width={20} name='calendar' />
  </>
))

export const Datepicker: React.FC<DatepickerProps> = ({ name, label }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { control } = useFormContext()

  const toggleCalendarOpen = () => setIsCalendarOpen((prev) => !prev)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <DatePickerWrapper
          $isCalendarOpen={isCalendarOpen}
          $isFloating={isCalendarOpen || Boolean(value)}
        >
          <ReactDatePicker
            id={name}
            customInput={<ReactDatePickerInput id={name} label={label} />}
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
