import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction" // needed for dayClick
import FullCalendar from "@fullcalendar/react"
import { useRef, useState } from "react"

import { CalendarWrapper } from "./Calendar.styled"

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()

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

  const handleDatesSet = () => {
    if (selectedDate) {
      calendarApi?.select(selectedDate)
      updateSelectedClass(selectedDate)
    }
  }

  return (
    <CalendarWrapper>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={[
          {
            date: new Date("2024-04-28"),
          },
          {
            date: new Date("2024-04-28"),
          },
          {
            date: new Date("2024-04-25"),
          },
          {
            date: new Date("2024-04-16"),
          },
          {
            date: new Date("2024-04-16"),
          },
          {
            date: new Date("2024-04-16"),
          },
          {
            date: new Date("2024-04-16"),
          },
        ]}
        contentHeight={300}
        eventColor='yellow'
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
