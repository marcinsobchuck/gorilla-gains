import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format, isWithinInterval } from "date-fns"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getEventsForCurrentMonthAction } from "@features/calendarScheduler/calendarSchedulerActions"
import { setSelectedDate } from "@features/calendarScheduler/calendarSchedulerSlice"
import { useMediaQuery } from "@hooks/useMediaQuery"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import { CalendarWrapper } from "./CalendarScheduler.styled"

export const CalendarScheduler = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const events = useAppSelector((state) => state.calendarScheduler.events)
  const selectedDate = useAppSelector((state) => state.calendarScheduler.selectedDate)
  const calendarSchedulerStatus = useAppSelector((state) => state.calendarScheduler.eventsStatus)

  const isMedium = useMediaQuery(Breakpoints.MEDIUM)

  const handleDateClick = (arg: DateClickArg) => {
    const dateClicked = arg.dateStr

    !isMedium && window.scrollTo({ top: 0, behavior: "smooth" })

    dispatch(setSelectedDate(dateClicked))
    updateSelectedClass(dateClicked)

    if (dateClicked === selectedDate) {
      updateSelectedClass("")
      dispatch(setSelectedDate(format(new Date(), "yyyy-MM-dd")))
    }
  }

  const handleDateFocus = (date: Date) => {
    const dateFocused = format(date, "yyyy-MM-dd")

    dispatch(setSelectedDate(format(date, "yyyy-MM-dd")))
    updateSelectedClass(dateFocused)

    if (dateFocused === selectedDate) {
      updateSelectedClass("")
      dispatch(setSelectedDate(format(new Date(), "yyyy-MM-dd")))
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

    const shouldSetDayEvents = isWithinInterval(new Date(selectedDate), {
      start: arg.view.currentStart,
      end: arg.view.currentEnd,
    })

    await dispatch(
      getEventsForCurrentMonthAction({
        startDate,
        endDate,
        theme,
        shouldSetDayEvents,
      })
    )
    if (selectedDate) {
      updateSelectedClass(selectedDate)
    }
  }

  return (
    <CalendarWrapper $isLoading={calendarSchedulerStatus === RequestStatuses.LOADING}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        firstDay={1}
        height={isMedium ? "100%" : "600px"}
        dayMaxEvents={2}
        dateClick={handleDateClick}
        navLinks
        navLinkDayClick={handleDateFocus}
        moreLinkText={isMedium ? "more" : ""}
        eventContent={(event) => {
          const activityType = event.event.extendedProps.type.type
          return (
            <Icon
              name={getDataForActivityType(activityType).iconName}
              color={getDataForActivityType(activityType, theme).primaryColor}
              width={isMedium ? 22 : 16}
              height={isMedium ? 22 : 16}
            />
          )
        }}
        events={events}
        headerToolbar={{
          left: "title",
          right: "today prev,next",
        }}
        datesSet={handleDatesSet}
      />
    </CalendarWrapper>
  )
}
