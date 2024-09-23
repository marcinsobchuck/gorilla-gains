import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format, isWithinInterval } from "date-fns"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Icon } from "@components/Icon/Icon"
import { IconName } from "@components/Icon/Icon.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getEventsForCurrentMonthAction } from "@features/calendarScheduler/calendarSchedulerActions"
import { setSelectedDate } from "@features/calendarScheduler/calendarSchedulerSlice"
import { getBorderColor } from "@features/historyCalendar/utils"

import { CalendarWrapper } from "./CalendarScheduler.styled"

export const CalendarScheduler = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const events = useAppSelector((state) => state.calendarScheduler.events)
  const selectedDate = useAppSelector((state) => state.calendarScheduler.selectedDate)
  const calendarSchedulerStatus = useAppSelector((state) => state.calendarScheduler.eventsStatus)

  const handleDateClick = (arg: DateClickArg) => {
    const dateClicked = arg.dateStr

    dispatch(setSelectedDate(dateClicked))
    updateSelectedClass(dateClicked)

    if (dateClicked === selectedDate) {
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
        height='100%'
        dayMaxEvents={2}
        dateClick={handleDateClick}
        eventContent={(event) => {
          return (
            <Icon
              name={event.event.extendedProps.type.type as IconName}
              color={getBorderColor(event.event.extendedProps.type.type as ActivityTypes, theme)}
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
