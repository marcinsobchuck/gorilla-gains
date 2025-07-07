import { useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { ChartTitle, Wrapper } from "./ActivitiesOverview.styled"
import { ActivitiesCharts } from "./components/ActivitiesCharts/ActivitiesCharts"

export const ActivitiesOverview = () => {
  const combination = useAppSelector((state) => state.activitiesOverview.activeChartCombination)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )
  const filterExercises = useAppSelector((state) => state.activitiesOverview.chartFilters)
  const exercise = filterExercises.find((el) => el.value === activeFilterExercise)
  const activities = useAppSelector((state) => state.activitiesOverview.activities)
  const status = useAppSelector((state) => state.activitiesOverview.activitiesStatus)

  return (
    <Wrapper id='activities-overview'>
      {activities.length > 0 && status !== RequestStatuses.LOADING && (
        <ChartTitle>
          {exercise?.labelText}: {combination.yAxis}/{combination.xAxis}
        </ChartTitle>
      )}

      <ActivitiesCharts />
    </Wrapper>
  )
}
