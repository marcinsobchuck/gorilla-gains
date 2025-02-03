import { DefaultTheme } from "styled-components"

import { ActivityTypes } from "@enums/activityTypes.enum"

type CommonFields = { iconName: ActivityTypes }

type ActivityTypeData = CommonFields & {
  primaryColor: string
  primaryColorOpacity: string
  secondaryColor: string
  cardGradient: string
}

export function getDataForActivityType(type: ActivityTypes): CommonFields
export function getDataForActivityType(type: ActivityTypes, theme: DefaultTheme): ActivityTypeData
export function getDataForActivityType(
  type: ActivityTypes,
  theme?: DefaultTheme
): CommonFields | ActivityTypeData {
  const commonFields = { iconName: type }
  if (!theme) {
    return commonFields
  }

  switch (type) {
    case ActivityTypes.STRENGTH:
      return {
        primaryColor: theme.strengthColor,
        primaryColorOpacity: theme.strengthColorOpacity,
        secondaryColor: theme.strengthColorSecondary,
        cardGradient: theme.strengthGradient,
        ...commonFields,
      }
    case ActivityTypes.ENDURANCE:
      return {
        primaryColor: theme.enduranceColor,
        primaryColorOpacity: theme.enduranceColorOpacity,
        secondaryColor: theme.enduranceColorSecondary,
        cardGradient: theme.enduranceGradient,
        ...commonFields,
      }
    case ActivityTypes.FLEXIBILITY:
      return {
        primaryColor: theme.flexibilityColor,
        primaryColorOpacity: theme.flexibilityColorOpacity,
        secondaryColor: theme.flexibilityColorSecondary,
        cardGradient: theme.flexibilityGradient,
        ...commonFields,
      }
    case ActivityTypes.BALANCE:
      return {
        primaryColor: theme.balanceColor,
        primaryColorOpacity: theme.balanceColorOpacity,
        secondaryColor: theme.balanceColorSecondary,
        cardGradient: theme.balanceGradient,
        ...commonFields,
      }
  }
}
