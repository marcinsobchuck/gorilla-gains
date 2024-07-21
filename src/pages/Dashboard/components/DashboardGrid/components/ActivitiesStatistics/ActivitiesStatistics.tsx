import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { Routes } from "@enums/routes.enum"
import { setActiveActivity } from "@features/activities/activitiesSlice"
import { setActiveFilterTab } from "@features/activitiesOverview/activitiesOverviewSlice"

import {
  CardsWrapper,
  LastActivityWrapper,
  StyledActivityCard,
} from "./ActivitiesStatistics.styled"
import { getActivitiesStatisticsItems } from "./utils"
import { BasicCard } from "../BasicCard/BasicCard"

export const ActivitiesStatistics = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const activitiesStatistics = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesStatistics
  )
  const activitiesStatisticsStatus = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryStatus
  )
  const lastActivity = useAppSelector((state) => state.activitiesSummary.lastActivity)
  const lastActivityStatus = useAppSelector(
    (state) => state.activitiesSummary.weeklyActivitiesDataStatus
  )
  console.log(navigator)
  return (
    <FlexContainer direction='column' gap={12}>
      {lastActivityStatus === RequestStatuses.LOADING || !lastActivity ? (
        <SkeletonTheme>
          <Skeleton height='100%' containerClassName='skeletonWrapper' />
        </SkeletonTheme>
      ) : (
        <LastActivityWrapper direction='column'>
          <h2>Last activity past 7 days</h2>
          <StyledActivityCard
            data={lastActivity}
            hasAdditionalActions={false}
            onClick={() => {
              navigate(Routes.ACTIVITY_HISTORY)
              dispatch(setActiveFilterTab("details"))
              dispatch(setActiveActivity(lastActivity))
            }}
          />
        </LastActivityWrapper>
      )}

      {activitiesStatisticsStatus === RequestStatuses.LOADING || !activitiesStatistics ? (
        <SkeletonTheme>
          <Skeleton height='100%' containerClassName='skeletonWrapper' />
        </SkeletonTheme>
      ) : (
        <CardsWrapper gap={12}>
          {getActivitiesStatisticsItems(activitiesStatistics).map((stat) => (
            <BasicCard key={stat.label} value={stat.value} label={stat.label} withTooltip={false} />
          ))}
        </CardsWrapper>
      )}
    </FlexContainer>
  )
}
