import { differenceInDays, parseISO } from "date-fns"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { Routes } from "@enums/routes.enum"
import { setActiveActivity, setIsActivityEventOpen } from "@features/activities/activitiesSlice"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  ActivityTitle,
  CardHeading,
  IconWrapper,
  LastActivityCard,
  LastActivityWrapper,
  MainContentWrapper,
  MainText,
} from "./LastActivity.styled"

export const LastActivity = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lastActivity = useAppSelector((state) => state.activitiesSummary.lastActivity)
  const lastActivityStatus = useAppSelector(
    (state) => state.activitiesSummary.weeklyActivitiesDataStatus
  )

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
        <h2>No activity registered in last 7 days.</h2>
      </LastActivityWrapper>
    )
  }

  const daysSinceActivity = differenceInDays(new Date(), parseISO(lastActivity.date))

  return (
    <LastActivityWrapper direction='column' justify='space-between'>
      <CardHeading>Last activity</CardHeading>

      <LastActivityCard
        direction='column'
        onClick={() => {
          navigate(Routes.ACTIVITY_HISTORY)
          dispatch(setActiveActivity({ activityId: lastActivity._id, activities: [lastActivity] }))
          dispatch(setIsActivityEventOpen(true))
        }}
      >
        <ActivityTitle>{lastActivity.type.type}</ActivityTitle>
        <MainContentWrapper align='center'>
          <FlexContainer align='center'>
            <IconWrapper justify='center' align='center'>
              <Icon
                name={getDataForActivityType(lastActivity.type.type).iconName}
                color={getDataForActivityType(lastActivity.type.type, theme).primaryColor}
              />
            </IconWrapper>
            <MainText>{lastActivity.title}</MainText>
          </FlexContainer>

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
