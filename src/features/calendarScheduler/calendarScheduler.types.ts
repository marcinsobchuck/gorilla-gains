import { DefaultTheme } from "styled-components"

import { GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { ActivityEvent } from "@features/types/types"

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
