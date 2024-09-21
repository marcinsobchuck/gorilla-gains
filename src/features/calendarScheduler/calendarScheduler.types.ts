import { EventInput } from "@fullcalendar/core/index.js"
import { DefaultTheme } from "styled-components"

import { Activity, GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export type ActivityEvent = Activity & Omit<EventInput, "date" | "title">

export interface InitialState {
  events: ActivityEvent[]
  dayEvents: ActivityEvent[]
  eventsStatus: RequestStatuses
  eventsError?: string
  selectedDate: string
  activeEvent?: ActivityEvent
  isActiveEventOpen: boolean
}

export interface GetEventsForCurrentMonthParams extends GetActivitiesForCurrentUserParams {
  theme: DefaultTheme
  shouldSetDayEvents?: boolean
}
