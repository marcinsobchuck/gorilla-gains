import { Activity, ExerciseSet } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export type YAxis = keyof ExerciseSet | "1RM" | ""

interface ChartCombination {
  xAxis: string
  yAxis: YAxis
}

export interface InitialState {
  activitiesStatus: RequestStatuses
  activities: Activity[]
  activeFilterTab: string
  activeFilterExercise: string
  activitiesError?: string
  activeChartCombination: ChartCombination
  chartFilters: {
    value: string
    labelText: string
  }[]
}
