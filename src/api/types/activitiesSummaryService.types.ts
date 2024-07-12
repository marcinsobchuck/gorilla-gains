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
}

interface ActivityTypeDistribution {
  name: string
  value: number
}

export interface ActivitiesStatistics {
  activitiesCount: number
  daysSinceLastActivity: number
  averageActivitiesPerWeek: number
  mostCommonExercise: MostCommonExercise
}

export interface ActivitiesSummaryData {
  totals: Totals
  activitiesStatistics: ActivitiesStatistics
  activitiesInYear: ActivityInYear[]
  activityTypeDistribution: ActivityTypeDistribution[]
}
