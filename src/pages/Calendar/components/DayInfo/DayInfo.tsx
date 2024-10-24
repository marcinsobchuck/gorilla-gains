import { format } from "date-fns"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { setIsAddEditModalOpen } from "@features/activities/activitiesSlice"
import {
  setActiveEvent,
  setIsActiveEventOpen,
} from "@features/calendarScheduler/calendarSchedulerSlice"
import { ActivityEvent } from "@features/types/types"

import {
  ActivityEventCard,
  ActivityName,
  DayIndicator,
  DayName,
  DayNumber,
  EventsLits,
  ListTitle,
  MonthName,
  StyledButton,
  Wrapper,
} from "./DayInfo.styled"

export const DayInfo = () => {
  const dispatch = useAppDispatch()

  const date = useAppSelector((state) => state.calendarScheduler.selectedDate)
  const dayEvents = useAppSelector((state) => state.calendarScheduler.dayEvents)
  const activeEvent = useAppSelector((state) => state.calendarScheduler.activeEvent)

  const dayName = format(date ? new Date(date) : new Date(), "eeee")
  const monthName = format(date ? new Date(date) : new Date(), "LLL")
  const dayNumber = format(date ? new Date(date) : new Date(), "d")

  const handleEventClick = (event: ActivityEvent) => {
    if (event._id === activeEvent?._id) {
      dispatch(setIsActiveEventOpen(false))
      dispatch(setActiveEvent(undefined))

      return
    }

    dispatch(setIsActiveEventOpen(true))
    dispatch(setActiveEvent(event._id))
  }

  const handleAddActivityButtonClick = () => dispatch(setIsAddEditModalOpen(true))

  return (
    <Wrapper>
      <DayIndicator direction='column' align='center'>
        <MonthName>{monthName}</MonthName>
        <DayNumber>{dayNumber}</DayNumber>
        <DayName>{dayName}</DayName>
      </DayIndicator>

      {dayEvents.length > 0 ? (
        <>
          <ListTitle>Current activities</ListTitle>
          <EventsLits>
            {dayEvents.map((dayEvent) => (
              <ActivityEventCard
                key={dayEvent._id}
                $isActive={activeEvent?._id === dayEvent._id}
                align='center'
                onClick={() => handleEventClick(dayEvent)}
              >
                <ActivityName>{dayEvent.title}</ActivityName>
              </ActivityEventCard>
            ))}
          </EventsLits>
        </>
      ) : (
        <FlexContainer justify='center'>
          <ListTitle>No activities this day.</ListTitle>
        </FlexContainer>
      )}
      <StyledButton
        buttonType='button'
        variant='tertiary'
        icon='add'
        onClick={handleAddActivityButtonClick}
      >
        Add activity
      </StyledButton>
    </Wrapper>
  )
}
