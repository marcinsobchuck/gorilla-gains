import { DefaultTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { ActivityEvent } from "@features/types/types"

export const getActivityEvents = (activities: Activity[], theme: DefaultTheme) => {
  const events = activities.map((activity): ActivityEvent => {
    const {
      type: { type },
    } = activity
    return {
      ...activity,
      color: getActivityEventColor(type, theme),
      allDay: true,
    }
  })

  return events
}

export const getActivityEventColor = (type: ActivityTypes, theme: DefaultTheme) => {
  switch (type) {
    case ActivityTypes.STRENGTH: {
      return theme.strengthEventColor
    }
    case ActivityTypes.ENDURANCE: {
      return theme.enduranceEventColor
    }
    case ActivityTypes.FLEXIBILITY: {
      return theme.flexibilityEventColor
    }
    case ActivityTypes.BALANCE: {
      return theme.balanceEventColor
    }
  }
}
