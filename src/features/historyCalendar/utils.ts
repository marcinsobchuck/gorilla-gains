import { DefaultTheme, useTheme } from "styled-components"

import { ActivityTypes } from "@enums/activityTypes.enum"

export const useCustomTheme = () => {
  const theme = useTheme()
  return theme
}

export const getBorderColor = (type: ActivityTypes, theme: DefaultTheme) => {
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
