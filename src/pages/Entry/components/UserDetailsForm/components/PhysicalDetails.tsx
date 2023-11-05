import { Input } from "@components/Input/Input"
import { Select } from "@components/Select/Select"

import { activityLevelOptions } from "./config"

export const PhysicalDetails = () => {
  return (
    <div>
      <Input id='height' label='Height' type='number' />
      <Input id='weight' label='Weight' type='number' />

      <Select options={activityLevelOptions} labelText='Activity level' name='activityLevel' />
    </div>
  )
}
