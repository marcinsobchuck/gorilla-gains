import { ActivityPreset } from "@api/types/activityPresets.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  activityPresets: ActivityPreset[]
  status: RequestStatuses
  error?: string
  isActivityPresetsVisible: boolean
}
