export interface ActivityType {
  _id: string
  type: string
  category: string
}

export interface GetActivityTypesQueryParams {
  filterText?: string
}
