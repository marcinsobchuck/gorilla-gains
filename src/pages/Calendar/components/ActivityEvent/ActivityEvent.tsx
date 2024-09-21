import { useTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { deleteActivityAction } from "@features/activities/activitiesActions"
import {
  removePreset,
  setCurrentlyEditedActivity,
  setIsAddEditModalOpen,
  setIsEditing,
} from "@features/activities/activitiesSlice"
import {
  setActiveEvent,
  setIsActiveEventOpen,
} from "@features/calendarScheduler/calendarSchedulerSlice"
import { ActivityDetails } from "@pages/ActivityHistory/components/ActivitiesInfo/components/ActivitiesOverview/components/ActivityDetails/ActivityDetails"

import { ButtonsWrapper, StyledButton, Wrapper } from "./ActivityEvent.styled"

export const ActivityEvent = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const activeEvent = useAppSelector((state) => state.calendarScheduler.activeEvent)
  const isActiveEventOpen = useAppSelector((state) => state.calendarScheduler.isActiveEventOpen)

  const handleRemoveActivity = async (id: string) => {
    if (confirm(`Are sure you want to delete this activity? ${activeEvent?.title}`) === false) {
      return
    } else {
      await dispatch(deleteActivityAction(id))
      if (id === activeEvent?._id) {
        dispatch(setIsActiveEventOpen(false))
        dispatch(setActiveEvent(undefined))
      }
      dispatch(removePreset(id))
    }
  }

  const handleEditActivity = (activity: Activity) => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activity))
  }

  return (
    <Wrapper $isOpen={isActiveEventOpen}>
      <ButtonsWrapper justify='space-between'>
        <StyledButton
          variant='tertiary'
          buttonType='button'
          icon='leftArrow'
          onClick={() => {
            dispatch(setIsActiveEventOpen(false))
            dispatch(setActiveEvent(undefined))
          }}
          color={theme.secondary}
        />
        {activeEvent && (
          <FlexContainer>
            <StyledButton
              variant='tertiary'
              buttonType='button'
              icon='edit'
              onClick={() => handleEditActivity(activeEvent)}
            >
              Edit
            </StyledButton>
            <StyledButton
              variant='tertiary'
              buttonType='button'
              icon='remove'
              onClick={() => handleRemoveActivity(activeEvent._id)}
            >
              Delete
            </StyledButton>
          </FlexContainer>
        )}
      </ButtonsWrapper>

      {activeEvent && <ActivityDetails activityDetails={activeEvent} />}
    </Wrapper>
  )
}
