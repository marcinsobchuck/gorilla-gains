import { format } from "date-fns"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

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
  const date = useAppSelector((state) => state.calendarScheduler.selectedDate)

  const dayEvents = useAppSelector((state) => state.calendarScheduler.dayEvents)

  const dayName = format(date ? new Date(date) : new Date(), "eeee")
  const monthName = format(date ? new Date(date) : new Date(), "LLL")
  const dayNumber = format(date ? new Date(date) : new Date(), "d")

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
              <ActivityEventCard key={dayEvent._id} align='center'>
                <ActivityName>{dayEvent.activityTitle}</ActivityName>
              </ActivityEventCard>
            ))}
          </EventsLits>
        </>
      ) : (
        <FlexContainer justify='center'>
          <ListTitle>No activities this day.</ListTitle>
        </FlexContainer>
      )}
      <StyledButton buttonType='button' variant='tertiary' icon='add'>
        Add activity
      </StyledButton>
    </Wrapper>
  )
}
