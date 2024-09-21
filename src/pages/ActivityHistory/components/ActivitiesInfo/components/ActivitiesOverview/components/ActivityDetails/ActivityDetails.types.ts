import { Activity } from "@api/types/activitiesService.types"
import { ActivityEvent } from "@features/calendarScheduler/calendarScheduler.types"

export interface ActivityDetailsProps {
  activityDetails: Activity | ActivityEvent
}
