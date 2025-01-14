import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  getActivitiesSummaryAction,
  getWeeklyActivitiesDataAction,
} from "@features/activitiesSummary/activitiesSummaryActions"
import { setShouldRefetchSummary } from "@features/activitiesSummary/activitiesSummarySlice"

import { ActivitiesBarChart } from "./components/ActivitiesBarChart/ActivitiesBarChart"
import { ActivitiesDistributionBar } from "./components/ActivitiesDistributionBar/ActivitiesDistributionBar"
import { ActivitiesStatistics } from "./components/ActivitiesStatistics/ActivitiesStatistics"
import { HealthMetrics } from "./components/HealthMetrics/HealthMetrics"
import { HumanSilhouette } from "./components/HumanSilhouette/HumanSilhouette"
import { LastActivity } from "./components/LastActivity/LastActivity"
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
      <ActivitiesDistributionBar />
      <HealthMetrics />
      <Totals />
      <LastActivity />
      <ActivitiesStatistics />
      <HumanSilhouette />
      <ActivitiesBarChart />
    </Wrapper>
  )
}
