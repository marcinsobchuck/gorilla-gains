import { DefaultTheme } from "styled-components"

import { GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { ActivityEvent } from "@features/types/types"

export interface InitialState {
  events: ActivityEvent[]
  eventsStatus: RequestStatuses
  eventsError?: string
}

export interface GetHistoryEventsForCurrentMonthParams extends GetActivitiesForCurrentUserParams {
  theme: DefaultTheme
}
