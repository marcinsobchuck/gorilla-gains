import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  getActivitiesSummaryAction,
  getWeeklyActivitiesDataAction,
} from "@features/activitiesSummary/activitiesSummaryActions"
import { setShouldRefetchSummary } from "@features/activitiesSummary/activitiesSummarySlice"

import { ActivitiesBarChart } from "./components/ActivitiesBarChart/ActivitiesBarChart"
import { ActivitiesPieChart } from "./components/ActivitiesPieChart/ActivitiesPieChart"
import { ActivitiesStatistics } from "./components/ActivitiesStatistics/ActivitiesStatistics"
import { HealthMetrics } from "./components/HealthMetrics/HealthMetrics"
import { HumanSilhouette } from "./components/HumanSilhouette/HumanSilhouette"
import { Totals } from "./components/Totals/Totals"
import { Wrapper } from "./DashboardGrid.styled"

export const DashboardGrid = () => {
  const dispatch = useAppDispatch()
  const shouldRefetchSummary = useAppSelector(
    (state) => state.activitiesSummary.shouldRefetchSummary
  )
  useEffect(() => {
    if (shouldRefetchSummary) {
      dispatch(getActivitiesSummaryAction())
      dispatch(getWeeklyActivitiesDataAction())
      dispatch(setShouldRefetchSummary(false))
    }
  }, [dispatch, shouldRefetchSummary])

  return (
    <Wrapper>
      <HealthMetrics />
      <Totals />
      <ActivitiesPieChart />
      <ActivitiesStatistics />
      <HumanSilhouette />
      <ActivitiesBarChart />
    </Wrapper>
  )
}
