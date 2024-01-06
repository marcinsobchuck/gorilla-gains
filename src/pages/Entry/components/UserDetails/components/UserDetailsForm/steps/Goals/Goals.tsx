import { Datepicker } from "@components/Datepicker/Datepicker"
import { Input } from "@components/Input/Input"
import { TileInputButton } from "@components/TileInputButton/TileInputButton"
import { goals } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/config"

import { GoalsTitle, GoalsWrapper, TilesWrapper } from "./Goals.styled"

export const Goals = () => {
  return (
    <>
      <Input id='desiredWeight' label='Desired Weight' type='number' />
      <Datepicker name='dueDateWeight' label='Date' />
      <GoalsWrapper>
        <GoalsTitle>Goals</GoalsTitle>

        <TilesWrapper>
          {goals.map((goal) => (
            <TileInputButton key={goal.value} name='goals' value={goal.value} label={goal.label} />
          ))}
        </TilesWrapper>
      </GoalsWrapper>
    </>
  )
}
