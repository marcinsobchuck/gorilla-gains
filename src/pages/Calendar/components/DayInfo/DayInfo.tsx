import { format } from "date-fns"

import { useAppSelector } from "@app/hooks"

import { DayIndicator, DayName, DayNumber, MonthName, Wrapper } from "./DayInfo.styled"

export const DayInfo = () => {
  const date = useAppSelector((state) => state.calendarScheduler.selectedDate)
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
    </Wrapper>
  )
}
