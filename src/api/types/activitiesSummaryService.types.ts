import { ActivityTypes } from "@enums/activityTypes.enum"

import { Activity } from "./activitiesService.types"

export interface Totals {
  weightLifted: number
  reps: number
  distance: number
}

interface MostCommonExercise {
  maxCount: number
  mostCommonExercise: string
}

interface ActivityInYear {
  name: string
  value: number
  [ActivityTypes.ENDURANCE]?: number
  [ActivityTypes.STRENGTH]?: number
  [ActivityTypes.FLEXIBILITY]?: number
  [ActivityTypes.BALANCE]?: number
  unresolved?: number
  fullMonthName?: string
}

interface ActivityTypeDistribution {
  name: ActivityTypes
  value: number
}

export interface ActivitiesStatistics {
  activitiesCount: number
  daysSinceLastActivity: number
  averageActivitiesPerWeek: number
  mostCommonExercise: MostCommonExercise
  unresolvedActivities: Activity[]
  plannedActivities: Activity[]
}

export interface ActivitiesSummaryData {
  totals: Totals
  activitiesStatistics: ActivitiesStatistics
  activitiesInYear: ActivityInYear[]
  activityTypeDistribution: {
    distributionPerActivityType: ActivityTypeDistribution[]
    totalDone: number
  }
}
