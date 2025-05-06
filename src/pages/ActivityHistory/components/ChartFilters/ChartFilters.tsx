import React from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { setActiveFilterExercise } from "@features/activitiesOverview/activitiesOverviewSlice"

import { StyledRadioButtonGroup, Wrapper } from "./ChartFilters.styled"
import { ChartFiltersProps } from "./ChartFilters.types"

export const ChartFilters: React.FC<ChartFiltersProps> = ({ activeTab }) => {
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
    <Wrapper $shouldDisplay={activeTab === "insights"}>
      {activities.length > 0 && (
        <StyledRadioButtonGroup
          items={items2}
          groupTitle='filters'
          name='filters'
          align='flex-start'
          justify='flex-start'
          direction='column'
          gap={14}
          onChange={(e) => {
            const activitiesOveriewElement = document.getElementById("activities-overview")

            activitiesOveriewElement?.scrollIntoView({ behavior: "smooth" })
            dispatch(setActiveFilterExercise(e.currentTarget.value))
          }}
        />
      )}
    </Wrapper>
  )
}
