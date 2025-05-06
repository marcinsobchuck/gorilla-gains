import { useEffect } from "react"
import { useTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { editActivityAction } from "@features/activities/activitiesActions"
import { useScrollLock } from "@hooks/useLockScroll"

import {
  HeaderWrapper,
  ManagedActivitiesList,
  StyledActivityEventCard,
  StyledButton,
  Title,
  Wrapper,
} from "./ManageActivities.styled"
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

  useScrollLock({ autoLock: isOpen })

  useEffect(() => {
    if (activities.length === 0) {
      onBack()
    }
  }, [activities.length, onBack])

  return (
    <Wrapper $isOpen={isOpen}>
      <HeaderWrapper direction='column'>
        <StyledButton
          variant='tertiary'
          buttonType='button'
          icon='leftArrow'
          onClick={onBack}
          iconColor={theme.secondary}
        />

        <Title>{title}</Title>
      </HeaderWrapper>

      <ManagedActivitiesList>
        {activities.map((activity) => {
          return (
            <StyledActivityEventCard
              key={activity._id}
              activity={activity}
              onCardStatusChange={async () => await handleOnCardStatusChange(activity)}
              isLoading={status === RequestStatuses.LOADING}
            />
          )
        })}
      </ManagedActivitiesList>
    </Wrapper>
  )
}
