import { activityLevelOptions } from "./config"
import { Input } from "../../../../../components/Input/Input"
import { Select } from "../../../../../components/Select/Select"

export const PhysicalDetails = () => {
  return (
    <div>
      <Input id='height' label='Height' type='number' />
      <Input id='weight' label='Weight' type='number' />
      <label htmlFor='activityLevel'>
        <Select options={activityLevelOptions} />
      </label>
    </div>
  )
}
