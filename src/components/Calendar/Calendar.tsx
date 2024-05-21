import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format } from "date-fns"
import { useRef, useState } from "react"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getEventsForCurrentMonthAction } from "@features/historyCalendar/historyCalendarActions"

import { CalendarWrapper } from "./Calendar.styled"

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()

  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.historyCalendar)
  const theme = useTheme()

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr)
    updateSelectedClass(arg.dateStr)
  }

  const updateSelectedClass = (newSelectedDate: string) => {
    document.querySelector(".fc-day-selected")?.classList.remove("fc-day-selected")

    const dateEl = document.querySelector(`[data-date="${newSelectedDate}"]`)
    if (dateEl) {
      dateEl.classList.add("fc-day-selected")
    }
  }

  const handleDatesSet = async (arg: DatesSetArg) => {
    const startDate = format(arg.view.activeStart, "yyyy/MM/dd")
    const endDate = format(arg.view.activeEnd, "yyyy/MM/dd")

    await dispatch(
      getEventsForCurrentMonthAction({
        startDate,
        endDate,
        theme,
      })
    )

    if (selectedDate) {
      calendarApi?.select(selectedDate)
      updateSelectedClass(selectedDate)
    }
  }

  return (
    <CalendarWrapper $isLoading={state.eventsStatus === RequestStatuses.LOADING}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={state.events}
        contentHeight={300}
        headerToolbar={{
          right: "prev,next",
        }}
        displayEventTime={false}
        dayMaxEventRows={3}
        dayHeaderFormat={{ weekday: "narrow" }}
        dateClick={handleDateClick}
        firstDay={1}
        selectable
        unselectAuto={false}
        moreLinkText={(num) => "+" + num.toString()}
        selectLongPressDelay={0}
        selectAllow={(selection) => {
          if (selection.end.getTime() / 1000 - selection.start.getTime() / 1000 <= 86400) {
            return true
          }
          return false
        }}
        fixedWeekCount={false}
        datesSet={handleDatesSet}
      />
    </CalendarWrapper>
  )
}
