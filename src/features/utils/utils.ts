import { DefaultTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { ActivityEvent } from "@features/types/types"
import { getDataForActivityType } from "@utils/getDataForActivityType"

export const getActivityEvents = (activities: Activity[], theme: DefaultTheme) => {
  const events = activities.map((activity): ActivityEvent => {
    const {
      type: { type },
    } = activity
    return {
      ...activity,
      color: getDataForActivityType(type, theme).primaryColor,
      allDay: true,
    }
  })

  return events
}
