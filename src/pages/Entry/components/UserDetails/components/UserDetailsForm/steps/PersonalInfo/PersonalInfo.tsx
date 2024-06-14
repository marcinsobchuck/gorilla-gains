import { Input } from "@components/Input/Input"
import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"

import { genderRadioItems } from "../../config"

export const PersonalInfo = () => {
  return (
    <div>
      <Input id='name' label='Name' type='text' />
      <Input id='surname' label='Surname' type='text' />
      <Input id='age' label='Age' type='number' />
      <RadioButtonGroup items={genderRadioItems} groupTitle='Gender' name='gender' gap={12} />
    </div>
  )
}
