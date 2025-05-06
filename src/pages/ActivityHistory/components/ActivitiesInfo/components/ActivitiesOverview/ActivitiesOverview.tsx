import { useAppSelector } from "@app/hooks"

import { ChartTitle, Wrapper } from "./ActivitiesOverview.styled"
import { ActivitiesCharts } from "./components/ActivitiesCharts/ActivitiesCharts"

export const ActivitiesOverview = () => {
  const combination = useAppSelector((state) => state.activitiesOverview.activeChartCombination)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )
  const filterExercises = useAppSelector((state) => state.activitiesOverview.chartFilters)
  const exercise = filterExercises.find((el) => el.value === activeFilterExercise)

  return (
    <Wrapper id='activities-overview'>
      <ChartTitle>
        {exercise?.labelText}: {combination.yAxis}/{combination.xAxis}
      </ChartTitle>
      <ActivitiesCharts />
    </Wrapper>
  )
}
