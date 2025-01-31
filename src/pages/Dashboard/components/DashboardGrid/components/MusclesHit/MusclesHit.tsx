import { useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { StyledHumanSilhouette, Wrapper } from "./MusclesHit.styled"

export const MusclesHit = () => {
  const status = useAppSelector((state) => state.activitiesSummary.weeklyActivitiesDataStatus)
  const musclesHit = useAppSelector((state) => state.activitiesSummary.musclesHit)

  return (
    <Wrapper direction='column'>
      <StyledHumanSilhouette
        musclesHit={musclesHit}
        isLoading={status === RequestStatuses.LOADING}
        title='Muscles hit past 7 days'
      />
    </Wrapper>
  )
}
