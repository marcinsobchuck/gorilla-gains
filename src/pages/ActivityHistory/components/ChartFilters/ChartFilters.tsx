import { useAppDispatch, useAppSelector } from "@app/hooks"
import { setActiveFilterExercise } from "@features/activitiesOverview/activitiesOverviewSlice"

import { StyledRadioButtonGroup, Wrapper } from "./ChartFilters.styled"

export const ChartFilters = () => {
  const dispatch = useAppDispatch()
  const activities = useAppSelector((state) => state.activitiesOverview.activities)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )
  const chartFilters = useAppSelector((state) => state.activitiesOverview.chartFilters)

  const items2 = chartFilters.map((filter) => ({
    ...filter,
    checked: filter.value === activeFilterExercise,
  }))

  return (
    <Wrapper>
      {activities.length > 0 && (
        <StyledRadioButtonGroup
          items={items2}
          groupTitle='filters'
          name='filters'
          align='flex-start'
          justify='flex-start'
          direction='column'
          gap={14}
          onChange={(e) => dispatch(setActiveFilterExercise(e.currentTarget.value))}
        />
      )}
    </Wrapper>
  )
}
