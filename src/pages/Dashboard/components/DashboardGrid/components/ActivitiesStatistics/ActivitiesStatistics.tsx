import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  ActivitiesStatisticsWrapper,
  CardsWrapper,
  StyledBasicCard,
} from "./ActivitiesStatistics.styled"
import { getActivitiesStatisticsItems } from "./utils"

export const ActivitiesStatistics = () => {
  const activitiesStatistics = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesStatistics
  )
  const activitiesStatisticsStatus = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryStatus
  )

  return (
    <ActivitiesStatisticsWrapper direction='row' gap={12}>
      {activitiesStatisticsStatus === RequestStatuses.LOADING || !activitiesStatistics ? (
        <SkeletonTheme>
          <Skeleton height='100%' containerClassName='skeletonWrapper' />
        </SkeletonTheme>
      ) : (
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
      )}
    </ActivitiesStatisticsWrapper>
  )
}
