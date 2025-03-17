import { Activity, CreateActivityData } from "./activitiesService.types"

export type ActivityPreset = Omit<Activity, "date">

export type CreateActivityPresetData = Omit<CreateActivityData, "date">
