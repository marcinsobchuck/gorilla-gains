import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { StyledHumanSilhouette, Title, Wrapper } from "./MusclesHit.styled"
import { NoDataMessage } from "../../DashboardGrid.styled"

export const MusclesHit = () => {
  const status = useAppSelector((state) => state.activitiesSummary.weeklyActivitiesDataStatus)
  const musclesHit = useAppSelector((state) => state.activitiesSummary.musclesHit)

  if (status === RequestStatuses.FAILED) {
    return (
      <Wrapper justify='center' align='center'>
        <NoDataMessage>Failed to load the data.</NoDataMessage>
      </Wrapper>
    )
  }

  if (status === RequestStatuses.LOADING) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  return (
    <Wrapper direction='column'>
      <Title>Muscles hit in last 7 days</Title>
      <StyledHumanSilhouette musclesHit={musclesHit} />
    </Wrapper>
  )
}
