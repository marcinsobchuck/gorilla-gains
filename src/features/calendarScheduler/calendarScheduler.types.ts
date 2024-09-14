import { EventInput } from "@fullcalendar/core/index.js"
import { DefaultTheme } from "styled-components"

import { GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface ActivityEvent extends EventInput {
  activityTitle: string
}

export interface InitialState {
  events: ActivityEvent[]
  eventsStatus: RequestStatuses
  eventsError?: string
  selectedDate: string
}

export interface GetEventsForCurrentMonthParams extends GetActivitiesForCurrentUserParams {
  theme: DefaultTheme
}
