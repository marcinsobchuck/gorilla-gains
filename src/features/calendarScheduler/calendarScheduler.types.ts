import { EventInput } from "@fullcalendar/core/index.js"
import { DefaultTheme } from "styled-components"

import { Activity, GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface ActivityEvent extends EventInput, Omit<Activity, "date" | "title"> {
  activityTitle: string
}

export interface InitialState {
  events: ActivityEvent[]
  dayEvents: ActivityEvent[]
  eventsStatus: RequestStatuses
  eventsError?: string
  selectedDate: string
}

export interface GetEventsForCurrentMonthParams extends GetActivitiesForCurrentUserParams {
  theme: DefaultTheme
  shouldSetDayEvents?: boolean
}
