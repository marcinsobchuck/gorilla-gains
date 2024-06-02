import { Activity } from "@api/types/activitiesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export type FilterTabs = ActivityTypes | "details"

export interface InitialState {
  activitiesStatus: RequestStatuses
  activities: Activity[]
  activeFilterTab: FilterTabs
  activitiesError?: string
}
