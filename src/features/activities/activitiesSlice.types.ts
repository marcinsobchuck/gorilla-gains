import { Activity } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  activitiesData?: Activity[]
  activitiesStatus: RequestStatuses
  activitiesError?: string

  createEditDeleteStatus: RequestStatuses
  createEditDeleteData?: Activity
  createEditDeleteError?: string

  presetsData?: Activity[]
  presetsStatus: RequestStatuses
  presetsError?: string

  activitiesPage: number
  hasMore: boolean
  isEditing: boolean
  isAddEditModalOpen: boolean

  currentlyEditedActivity?: Activity
}
