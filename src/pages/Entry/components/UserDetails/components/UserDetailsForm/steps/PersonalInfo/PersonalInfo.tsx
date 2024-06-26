import { Datepicker } from "@components/Datepicker/Datepicker"
import { Input } from "@components/Input/Input"
import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"

import { genderRadioItems } from "../../config"

export const PersonalInfo = () => {
  return (
    <div>
      <Input id='name' label='Name' type='text' />
      <Input id='surname' label='Surname' type='text' />
      <Datepicker
        label='age'
        name='age'
        showYearDropdown
        dateFormatCalendar='MMMM'
        scrollableYearDropdown
        maxDate={new Date()}
        yearDropdownItemNumber={100}
      />
      <RadioButtonGroup items={genderRadioItems} groupTitle='Gender' name='gender' gap={12} />
    </div>
  )
}
