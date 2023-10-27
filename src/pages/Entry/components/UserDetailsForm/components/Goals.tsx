import { Input } from "../../../../../components/Input/Input"

export const Goals = () => {
  return (
    <div>
      <Input id='desiredWeight' label='Desired Weight' type='number' />
      <Input id='dueDateWeight' label='Due date weight' type='date' />
      <Input id='gainPower' label='Gain power' type='checkbox' />
      <Input id='loseWeight' label='Lose weight' type='checkbox' />
      <Input id='improveOverall' label='Improve overall physique' type='checkbox' />
    </div>
  )
}
