import { DefaultTheme } from "styled-components/dist/types"

import { Activity, CreateActivityData } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  activitiesData: Activity[]
  activitiesStatus: RequestStatuses
  activitiesError?: string

  createActivityStatus: RequestStatuses
  editActivityStatus: RequestStatuses
  deleteActivityStatus: RequestStatuses

  createActivityError?: string
  editActivityError?: string
  deleteActivityError?: string

  presetsData?: Activity[]
  presetsStatus: RequestStatuses
  presetsError?: string

  activitiesPage: number
  limit: number
  hasMore: boolean
  isEditing: boolean
  isAddEditModalOpen: boolean

  currentlyProcessedActivityId: string | null
  currentlyEditedActivity?: Activity
}

export interface CreateActivityParams {
  data: CreateActivityData
  theme: DefaultTheme
}
