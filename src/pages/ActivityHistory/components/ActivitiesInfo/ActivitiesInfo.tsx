import { ActivitiesOverview } from "./components/ActivitiesOverview/ActivitiesOverview"
import { FiltersBar } from "./components/FiltersBar/FiltersBar"

export const ActivitiesInfo = () => {
  return (
    <>
      <FiltersBar />
      <ActivitiesOverview />
    </>
  )
}
