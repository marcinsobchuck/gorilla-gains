import { ActivitiesStatistics } from "@api/types/activitiesSummaryService.types"

export const getActivitiesStatisticsItems = (activitiesStatistics: ActivitiesStatistics) => {
  return [
    {
      label: "Days since last activity",
      value: activitiesStatistics.daysSinceLastActivity,
    },
    {
      label: "Overall activities done",
      value: activitiesStatistics.activitiesCount,
    },
    {
      label: "Avg. activities/week",
      value: activitiesStatistics.averageActivitiesPerWeek,
    },
    {
      label: "Most common exercise",
      value: `${activitiesStatistics.mostCommonExercise.mostCommonExercise}(${activitiesStatistics.mostCommonExercise.maxCount})`,
    },
  ]
}
