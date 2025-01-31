import { Activity } from "@api/types/activitiesService.types"
import { ActivitiesSummaryData } from "@api/types/activitiesSummaryService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface MusclesHit {
  primary: string[]
  secondary: string[]
}

export interface InitialState {
  activitiesSummaryData: ActivitiesSummaryData | null
  activitiesSummaryStatus: RequestStatuses
  activitiesSummaryError?: string

  weeklyActivitiesDataStatus: RequestStatuses
  weeklyActivitiesDataError?: string
  lastActivity: Activity | null
  musclesHit: MusclesHit | null
  shouldRefetchSummary: boolean
}
