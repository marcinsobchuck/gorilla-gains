import { HealthMetrics } from "./components/HealthMetrics/HealthMetrics"
import { Totals } from "./components/Totals"
import { Wrapper } from "./DashboardGrid.styled"

export const DashboardGrid = () => {
  return (
    <Wrapper>
      <HealthMetrics />
      <div>
        <Totals />
        <div>Weight goal due time: 54</div>
      </div>
      <div style={{ backgroundColor: "blue" }}>xdd</div>
      <div style={{ backgroundColor: "red" }}>xdd</div>
      <div style={{ backgroundColor: "yellow" }}>xdd</div>
    </Wrapper>
  )
}
