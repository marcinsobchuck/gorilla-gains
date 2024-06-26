import { ReactDatePickerProps } from "react-datepicker"

export interface AdditionalProps {
  name: string
  label: string
  withError?: boolean
}

export type DatepickerProps = AdditionalProps & Partial<ReactDatePickerProps>
