import { ActivitiesBarChart } from "./components/ActivitiesBarChart/ActivitiesBarChart"
import { ActivitiesPieChart } from "./components/ActivitiesPieChart/ActivitiesPieChart"
import { ActivitiesStatistics } from "./components/ActivitiesStatistics/ActivitiesStatistics"
import { HealthMetrics } from "./components/HealthMetrics/HealthMetrics"
import { HumanSilhouette } from "./components/HumanSilhouette/HumanSilhouette"
import { Totals } from "./components/Totals/Totals"
import { Wrapper } from "./DashboardGrid.styled"

export const DashboardGrid = () => {
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
