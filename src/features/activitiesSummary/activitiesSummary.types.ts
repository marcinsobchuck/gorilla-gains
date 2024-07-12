import { ActivitiesSummaryData } from "@api/types/activitiesSummaryService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  activitiesSummaryData: ActivitiesSummaryData | null

  activitiesSummaryStatus: RequestStatuses
  activitiesSummaryError?: string
}
