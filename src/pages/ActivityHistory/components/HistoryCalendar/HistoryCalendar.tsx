import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format, isSameMonth, parseISO } from "date-fns"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivitiesForCurrentUserAction } from "@features/activities/activitiesActions"
import {
  resetActivitiesData,
  setActivitiesData,
  setHasMore,
  setIsActivityDetailsOpen,
  setSelectedDate,
} from "@features/activities/activitiesSlice"
import { getHistoryEventsForCurrentMonthAction } from "@features/historyCalendar/historyCalendarActions"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import { CalendarWrapper, EventDot } from "./HistoryCalendar.styled"
import { updateSelectedClass } from "./utils"

export const HistoryCalendar = () => {
  const dispatch = useAppDispatch()
  const historyCalendar = useAppSelector((state) => state.historyCalendar)
  const activities = useAppSelector((state) => state.activities)
  const isActivityDetailsOpen = useAppSelector((state) => state.activities.isActivityDetailsOpen)
  const selectedDate = activities.selectedDate
  const limit = activities.limit
  const theme = useTheme()

  const handleDateClick = async (arg: DateClickArg) => {
    const dateClicked = arg.date

    dispatch(setSelectedDate(arg.dateStr))
    updateSelectedClass(arg.dateStr)

    isActivityDetailsOpen && dispatch(setIsActivityDetailsOpen(false))

    const dayHasEvent = historyCalendar.events.some(
      (event) => format(parseISO(event.date), "yyyy/MM/dd") === format(dateClicked, "yyyy/MM/dd")
    )

    if (arg.dateStr === selectedDate) {
      updateSelectedClass("")
      dispatch(setSelectedDate(""))
      if (dayHasEvent || activities.activitiesData.length === 0) {
        dispatch(resetActivitiesData())

        await dispatch(
          getActivitiesForCurrentUserAction({
            offset: 0,
            limit,
            pastOnly: true,
          })
        )
        dispatch(setHasMore(true))
      }
    } else if (dayHasEvent) {
      const dayEvents = historyCalendar.events.filter(
        (event) => event.date === dateClicked.toISOString()
      )
      dispatch(setActivitiesData(dayEvents))
      dispatch(setHasMore(false))
    } else {
      dispatch(resetActivitiesData())
      dispatch(setHasMore(false))
    }
  }

  const handleDatesSet = async (arg: DatesSetArg) => {
    const startDate = arg.view.activeStart
    const today = new Date()
    const isCurrentMonth = isSameMonth(today, arg.view.currentStart)
    const endDate = isCurrentMonth ? today : arg.view.activeEnd

    if (startDate < today)
      await dispatch(
        getHistoryEventsForCurrentMonthAction({
          startDate,
          endDate,
          theme,
        })
      )

    if (selectedDate) {
      updateSelectedClass(selectedDate)
    }
  }

  return (
    <CalendarWrapper $isLoading={historyCalendar.eventsStatus === RequestStatuses.LOADING}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={historyCalendar.events}
        contentHeight={300}
        headerToolbar={{
          right: "prev,next",
        }}
        eventContent={(event) => {
          return (
            <EventDot
              color={
                getDataForActivityType(event.event.extendedProps.type.type, theme).primaryColor
              }
            />
          )
        }}
        displayEventTime={false}
        dayMaxEventRows={3}
        dayHeaderFormat={{ weekday: "narrow" }}
        dateClick={handleDateClick}
        firstDay={1}
        moreLinkText={(num) => "+" + num.toString()}
        fixedWeekCount={false}
        datesSet={handleDatesSet}
      />
    </CalendarWrapper>
  )
}
