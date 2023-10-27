import { useFormContext } from "react-hook-form"

import { Input } from "../../../../../components/Input/Input"

export const PhysicalDetails = () => {
  const { register } = useFormContext()
  return (
    <div>
      <Input id='height' label='Height' type='number' />
      <Input id='weight' label='Weight' type='number' />

      <select {...register("activityLevel")}>
        <option value='extremely inactive'>Extremely inactive</option>
        <option value='sedentary'>sedentary</option>
        <option value='moderately active'>moderately active</option>
        <option value='vigorously active'>vigorously active</option>
        <option value='extremely active'>extremely active</option>
      </select>
    </div>
  )
}
