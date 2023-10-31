import { Input } from "@components/Input/Input"

export const PersonalInfo = () => {
  return (
    <div>
      <Input id='name' label='Name' type='text' />
      <Input id='surname' label='Surname' type='text' />
      <Input id='age' label='Age' type='number' />
      <Input id='gender' label='Gender' type='text' />
    </div>
  )
}
