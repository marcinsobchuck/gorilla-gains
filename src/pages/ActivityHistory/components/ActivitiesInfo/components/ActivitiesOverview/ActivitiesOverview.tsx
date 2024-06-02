import { useAppSelector } from "@app/hooks"

import { Wrapper } from "./ActivitiesOverview.styled"
import { ActivityDetails } from "./components/ActivityDetails/ActivityDetails"

export const ActivitiesOverview = () => {
  const activityDetails = useAppSelector((state) => state.activities.activeActivity)
  const activeFilterTab = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  return (
    <Wrapper>
      {activeFilterTab === "details" && activityDetails && (
        <ActivityDetails activityDetails={activityDetails} />
      )}
      {activeFilterTab !== "details" && <div>wykres {activeFilterTab}</div>}
    </Wrapper>
  )
}
