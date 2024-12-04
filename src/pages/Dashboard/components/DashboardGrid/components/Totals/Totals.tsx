import { differenceInDays, parseISO } from "date-fns"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { TotalsWrapper } from "./Totals.styled"
import { getTotals } from "./utils"
import { BasicCard } from "../BasicCard/BasicCard"
import { LabelText, ValueText } from "../BasicCard/BasicCard.styled"

export const Totals = () => {
  const userState = useAppSelector((state) => state.user)
  const totals = useAppSelector((state) => state.activitiesSummary.activitiesSummaryData?.totals)
  const totalsStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)
  const userInfoStatus = useAppSelector((state) => state.user.status)

  const dueDateWeight = userState.data?.dueDateWeight

  const daysLeftWeightGoal = dueDateWeight
    ? differenceInDays(parseISO(dueDateWeight), new Date())
    : "-"

  if (
    userInfoStatus === RequestStatuses.LOADING ||
    totalsStatus === RequestStatuses.LOADING ||
    !totals
  ) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  return (
    <FlexContainer justify='space-between' gap={12}>
      <TotalsWrapper direction='column' justify='space-between'>
        {getTotals(totals).map((total) => (
          <FlexContainer justify='space-between' align='center' key={total.label}>
            <LabelText>{total.label}</LabelText> <ValueText>{total.value}</ValueText>
          </FlexContainer>
        ))}
      </TotalsWrapper>

      <BasicCard label='Weight goal days left' withTooltip={false} value={daysLeftWeightGoal} />
    </FlexContainer>
  )
}
