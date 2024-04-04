import { ActivityTypes } from "@enums/activityTypes.enum"

export const getIconNamePerActivityType = (type: ActivityTypes) => {
  switch (type) {
    case ActivityTypes.STRENGTH: {
      return "strength"
    }
    case ActivityTypes.ENDURANCE: {
      return "endurance"
    }
    case ActivityTypes.FLEXIBILITY: {
      return "flexibility"
    }
    case ActivityTypes.BALANCE: {
      return "balance"
    }
  }
}
