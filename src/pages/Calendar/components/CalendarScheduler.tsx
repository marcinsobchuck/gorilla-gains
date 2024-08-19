import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"

import { CalendarWrapper } from "./CalendarScheduler.styled"

export const CalendarScheduler = () => {
  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        firstDay={1}
        height='100%'
        headerToolbar={{
          left: "title",
          right: "today prev,next",
        }}
      />
    </CalendarWrapper>
  )
}
