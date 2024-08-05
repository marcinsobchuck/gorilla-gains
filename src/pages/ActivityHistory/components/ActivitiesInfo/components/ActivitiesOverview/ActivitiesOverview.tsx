import { useAppSelector } from "@app/hooks"

import { Wrapper } from "./ActivitiesOverview.styled"
import { ActivitiesCharts } from "./components/ActivitiesCharts/ActivitiesCharts"
import { ActivityDetails } from "./components/ActivityDetails/ActivityDetails"

export const ActivitiesOverview = () => {
  const activeActivityId = useAppSelector((state) => state.activities.activeActivityId)
  const activeFilterTab = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  const activitiesList = useAppSelector((state) => state.activities.activitiesData)
  const activitiesChart = useAppSelector((state) => state.activitiesOverview.activities)

  const activeActivity =
    activitiesList.find((activity) => activity._id === activeActivityId) ||
    activitiesChart.find((activity) => activity._id === activeActivityId)

  return (
    <Wrapper>
      {activeFilterTab === "details" && activeActivity && (
        <ActivityDetails activityDetails={activeActivity} />
      )}
      {activeFilterTab !== "details" && <ActivitiesCharts />}
    </Wrapper>
  )
}
