import { DatesSetArg } from "@fullcalendar/core/index.js"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { format, isWithinInterval, parseISO } from "date-fns"
import { useRef } from "react"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Icon } from "@components/Icon/Icon"
import { IconName } from "@components/Icon/Icon.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { getEventsForCurrentMonthAction } from "@features/calendarScheduler/calendarSchedulerActions"
import { setSelectedDate } from "@features/calendarScheduler/calendarSchedulerSlice"
import { getBorderColor } from "@features/historyCalendar/utils"

import { CalendarWrapper } from "./CalendarScheduler.styled"

export const CalendarScheduler = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()
  const events = useAppSelector((state) => state.calendarScheduler.events)
  const selectedDate = useAppSelector((state) => state.calendarScheduler.selectedDate)

  const handleDateClick = (arg: DateClickArg) => {
    const dateClicked = arg.date

    dispatch(setSelectedDate(arg.dateStr))
    updateSelectedClass(arg.dateStr)

    const dayHasEvent = events.some((event) => {
      if (typeof event.date === "string") {
        return format(parseISO(event.date), "yyyy/MM/dd") === format(dateClicked, "yyyy/MM/dd")
      }
    })

    if (arg.dateStr === selectedDate) {
      calendarApi?.unselect()
      updateSelectedClass("")
      dispatch(setSelectedDate(""))
    } else if (dayHasEvent) {
      console.log("dayHasEvent")
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
      calendarApi?.select(selectedDate)
      updateSelectedClass(selectedDate)
    }
  }

  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        firstDay={1}
        height='100%'
        dayMaxEvents={2}
        dateClick={handleDateClick}
        eventContent={(event) => (
          <Icon
            name={event.event.title as IconName}
            color={getBorderColor(event.event.title as ActivityTypes, theme)}
          />
        )}
        events={events}
        selectAllow={(selection) => {
          if (selection.end.getTime() / 1000 - selection.start.getTime() / 1000 <= 86400) {
            return true
          }
          return false
        }}
        headerToolbar={{
          left: "title",
          right: "today prev,next",
        }}
        datesSet={handleDatesSet}
      />
    </CalendarWrapper>
  )
}
