import { differenceInDays } from "date-fns"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { TotalsWrapper } from "./Totals.styled"
import { BasicCard } from "../BasicCard/BasicCard"
import { LabelText, ValueText } from "../BasicCard/BasicCard.styled"

export const Totals = () => {
  const userState = useAppSelector((state) => state.user)
  const dueDateWeight = userState.data?.dueDateWeight
  const daysLeftWeightGoal = dueDateWeight ? differenceInDays(dueDateWeight, new Date()) : "-"

  return (
    <FlexContainer justify='space-between' gap={12}>
      <TotalsWrapper direction='column' justify='space-between'>
        <FlexContainer justify='space-between' align='center'>
          <LabelText>Total weight lifted</LabelText> <ValueText>3533 kg</ValueText>
        </FlexContainer>
        <FlexContainer justify='space-between' align='center'>
          <LabelText>Total distance covered</LabelText> <ValueText>3234 km</ValueText>
        </FlexContainer>
        <FlexContainer justify='space-between' align='center'>
          <LabelText>Total reps done</LabelText> <ValueText>27123</ValueText>
        </FlexContainer>
      </TotalsWrapper>
      <BasicCard
        label='Weight goal days left'
        withTooltip={false}
        value={`${daysLeftWeightGoal}`}
      />
    </FlexContainer>
  )
}
