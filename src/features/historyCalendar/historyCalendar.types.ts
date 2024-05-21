import { DefaultTheme } from "styled-components"

import { GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

interface ActivityEvent {
  id: string
  borderColor: string
  date: Date
}

export interface InitialState {
  events: ActivityEvent[]
  eventsStatus: RequestStatuses
  eventsError?: string
}

export interface GetEventsForCurrentMonthParams extends GetActivitiesForCurrentUserParams {
  theme: DefaultTheme
}
