import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format, parseISO } from "date-fns"
import { useRef } from "react"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  getActivitiesForCurrentUserAction,
  getActivitiesForSelectedDate,
} from "@features/activities/activitiesActions"
import {
  resetActivitiesData,
  setHasMore,
  setSelectedDate,
} from "@features/activities/activitiesSlice"
import { getEventsForCurrentMonthAction } from "@features/historyCalendar/historyCalendarActions"

import { CalendarWrapper } from "./Calendar.styled"

export const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()

  const dispatch = useAppDispatch()
  const historyCalendar = useAppSelector((state) => state.historyCalendar)
  const activities = useAppSelector((state) => state.activities)
  const selectedDate = activities.selectedDate
  const limit = activities.limit
  const theme = useTheme()

  const handleDateClick = async (arg: DateClickArg) => {
    const dateClicked = arg.date

    dispatch(setSelectedDate(arg.dateStr))
    updateSelectedClass(arg.dateStr)

    const dayHasEvent = historyCalendar.events.some(
      (event) => format(parseISO(event.date), "yyyy/MM/dd") === format(dateClicked, "yyyy/MM/dd")
    )

    if (arg.dateStr === selectedDate) {
      calendarApi?.unselect()
      updateSelectedClass("")
      dispatch(setSelectedDate(""))
      if (dayHasEvent) {
        dispatch(resetActivitiesData())
        await dispatch(
          getActivitiesForCurrentUserAction({
            offset: 0,
            limit,
          })
        )
        dispatch(setHasMore(true))
      }
    } else if (dayHasEvent) {
      dispatch(setHasMore(false))
      await dispatch(
        getActivitiesForSelectedDate({
          startDate: dateClicked,
          endDate: dateClicked,
        })
      )
    }
  }

  const updateSelectedClass = (newSelectedDate: string) => {
    document.querySelector(".fc-day-selected")?.classList.remove("fc-day-selected")

    const dateEl = document.querySelector(`[data-date="${newSelectedDate}"]`)
    if (dateEl) {
      dateEl.classList.add("fc-day-selected")
    }
  }

  const handleDatesSet = async (arg: DatesSetArg) => {
    const startDate = arg.view.activeStart
    const endDate = arg.view.activeEnd

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
    <CalendarWrapper $isLoading={historyCalendar.eventsStatus === RequestStatuses.LOADING}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={historyCalendar.events}
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
