import { differenceInDays, parseISO } from "date-fns"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { Routes } from "@enums/routes.enum"
import { setActiveActivity, setIsActivityEventOpen } from "@features/activities/activitiesSlice"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  CardHeading,
  LastActivityCard,
  LastActivityWrapper,
  MainContentWrapper,
} from "./LastActivity.styled"
import { NoDataMessage } from "../../DashboardGrid.styled"

export const LastActivity = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lastActivity = useAppSelector((state) => state.activitiesSummary.lastActivity)
  const lastActivityStatus = useAppSelector(
    (state) => state.activitiesSummary.weeklyActivitiesDataStatus
  )

  if (lastActivityStatus === RequestStatuses.FAILED) {
    return (
      <LastActivityWrapper justify='center' align='center'>
        <NoDataMessage>Failed to load the data.</NoDataMessage>
      </LastActivityWrapper>
    )
  }

  if (lastActivityStatus === RequestStatuses.LOADING) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' containerClassName='skeletonWrapper' />
      </SkeletonTheme>
    )
  }

  if (!lastActivity) {
    return (
      <LastActivityWrapper justify='center' align='center'>
        <NoDataMessage>No activity registered in last 7 days.</NoDataMessage>
      </LastActivityWrapper>
    )
  }

  const daysSinceActivity = differenceInDays(new Date(), parseISO(lastActivity.date))

  return (
    <LastActivityWrapper direction='column' justify='space-between'>
      <CardHeading>Last activity</CardHeading>

      <LastActivityCard
        $bgColor={getDataForActivityType(lastActivity.type.type, theme).cardGradient}
        direction='column'
        onClick={() => {
          navigate(Routes.ACTIVITY_HISTORY)
          dispatch(setActiveActivity({ activityId: lastActivity._id, activities: [lastActivity] }))
          dispatch(setIsActivityEventOpen(true))
        }}
      >
        <MainContentWrapper align='center'>
          <ActivityTypeBadge
            activityType={lastActivity.type.type}
            title={lastActivity.title}
            subtitle={lastActivity.type.type}
            titleSize={14}
          />

          {daysSinceActivity > 0 && (
            <span>
              {daysSinceActivity} {daysSinceActivity > 1 ? "days" : "day"} ago
            </span>
          )}
        </MainContentWrapper>
      </LastActivityCard>
    </LastActivityWrapper>
  )
}
