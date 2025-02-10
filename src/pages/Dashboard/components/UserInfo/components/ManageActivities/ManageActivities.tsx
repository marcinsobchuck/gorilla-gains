import { useEffect } from "react"
import { useTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityEventCard } from "@components/ActivityEventCard/ActivityEventCard"
import { Icon } from "@components/Icon/Icon"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { editActivityAction } from "@features/activities/activitiesActions"

import { HeaderWrapper, ManagedActivitiesList, Title, Wrapper } from "./ManageActivities.styled"
import { ManageActivitiesProps } from "./ManageActivities.types"

export const ManageActivities: React.FC<ManageActivitiesProps> = ({
  isOpen,
  title,
  activities,
  onBack,
}) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.activities.editActivityStatus)

  const handleOnCardStatusChange = async (activity: Activity) => {
    await dispatch(
      editActivityAction({
        activityId: activity._id,
        dataToEdit: { isDone: !activity.isDone },
      })
    )
  }

  useEffect(() => {
    if (activities.length === 0) {
      onBack()
    }
  }, [activities.length, onBack])

  return (
    <Wrapper $isOpen={isOpen}>
      <HeaderWrapper direction='column'>
        <Icon name='leftArrow' onClick={onBack} color={theme.secondary} isInteractive />
        <Title>{title}</Title>
      </HeaderWrapper>

      <ManagedActivitiesList>
        {activities.map((activity) => {
          return (
            <ActivityEventCard
              key={activity._id}
              activity={activity}
              onCardStatusChange={async () => await handleOnCardStatusChange(activity)}
              isLoading={status === RequestStatuses.LOADING}
            ></ActivityEventCard>
          )
        })}
      </ManagedActivitiesList>
    </Wrapper>
  )
}
