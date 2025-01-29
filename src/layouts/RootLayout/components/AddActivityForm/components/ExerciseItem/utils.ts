import {
  balanceExerciseFields,
  enduranceExerciseFields,
  flexibilityExerciseFields,
  strengthNonStaticExerciseFields,
  strengthStaticExerciseFields,
} from "../../constants"

export const getSetsFormFields = (activityType: string, isExerciseStatic?: boolean) => {
  switch (activityType) {
    case "strength":
      return isExerciseStatic ? strengthStaticExerciseFields : strengthNonStaticExerciseFields
    case "endurance":
      return enduranceExerciseFields
    case "flexibility":
      return flexibilityExerciseFields
    case "balance":
      return balanceExerciseFields
    default:
      return {}
  }
}
