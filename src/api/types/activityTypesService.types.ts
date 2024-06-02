import { ActivityTypes } from "@enums/activityTypes.enum"

export interface ActivityType {
  _id: string
  type: ActivityTypes
}

export interface GetActivityTypesQueryParams {
  filterText?: string
}
