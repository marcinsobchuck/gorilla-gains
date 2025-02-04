import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  ActivitiesStatisticsWrapper,
  CardsWrapper,
  StyledBasicCard,
} from "./ActivitiesStatistics.styled"
import { getActivitiesStatisticsItems } from "./utils"
import { NoDataMessage } from "../../DashboardGrid.styled"

export const ActivitiesStatistics = () => {
  const activitiesStatistics = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesStatistics
  )
  const activitiesStatisticsStatus = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryStatus
  )

  if (activitiesStatisticsStatus === RequestStatuses.FAILED || !activitiesStatistics) {
    return (
      <ActivitiesStatisticsWrapper justify='center' align='center'>
        <NoDataMessage>Failed to load the data.</NoDataMessage>
      </ActivitiesStatisticsWrapper>
    )
  }

  if (activitiesStatisticsStatus === RequestStatuses.LOADING) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  const noActivitiesDone = activitiesStatistics.activitiesCount === 0

  if (noActivitiesDone) {
    return (
      <ActivitiesStatisticsWrapper justify='center' align='center'>
        <NoDataMessage>No activities done.</NoDataMessage>
      </ActivitiesStatisticsWrapper>
    )
  }

  return (
    <FlexContainer gap={12}>
      <CardsWrapper gap={12}>
        {getActivitiesStatisticsItems(activitiesStatistics).map((stat) => (
          <StyledBasicCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            withTooltip={false}
          />
        ))}
      </CardsWrapper>
    </FlexContainer>
  )
}
