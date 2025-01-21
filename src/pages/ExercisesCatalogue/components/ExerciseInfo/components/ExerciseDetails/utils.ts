import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

export type MuscleClassName =
  | "neck"
  | "shoulders"
  | "calves"
  | "foot"
  | "traps"
  | "triceps"
  | "biceps"
  | "forearm"
  | "hand"
  | "chest"
  | "abs"
  | "obliques"
  | "glutes"
  | "frontUpperLeg"
  | "backUpperLeg"
  | "frontLowerLeg"
  | "backLowerLeg"
  | "backShoulders"
  | "backHeadMuscle"
  | "backNeck"
  | "backLats"
  | "lowerBack"

const singleWordKeys = [
  "chest",
  "neck",
  "biceps",
  "shoulders",
  "abs",
  "traps",
  "triceps",
  "obliques",
  "glutes",
  "calves",
  "foot",
]

const neck = ["backNeck", "neck"]

const shoulders = ["shoulders", "backShoulders"]

const backLowerLeg = ["backLowerLeg", "calves"]

export const transformMuscleClassToText = (keyName: MuscleClassName) => {
  if (singleWordKeys.includes(keyName)) {
    return capitalizeFirstLetter(keyName)
  }

  if (neck.includes(keyName)) {
    return "Neck"
  }

  if (shoulders.includes(keyName)) {
    return "Shoulders"
  }

  if (backLowerLeg.includes(keyName)) {
    return "Calves"
  }

  if (keyName === "backLats") {
    return "Lats"
  }

  if (keyName === "frontUpperLeg") {
    return "Quads"
  }

  if (keyName === "backUpperLeg") {
    return "Hamstrings"
  }

  if (keyName === "lowerBack") {
    return "Erector spinae/lower back"
  }

  if (keyName === "frontLowerLeg") {
    return "Front lower leg"
  }
}
