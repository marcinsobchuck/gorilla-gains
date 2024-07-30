import { Activity, CreateActivityData } from "@api/types/activitiesService.types"
import { ActivityType } from "@api/types/activityTypesService.types"
import { Exercise } from "@api/types/exercisesService.types"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

import { AddActivityFormTypes } from "./AddActivityForm.types"
import { transformResponseExercises } from "./components/PresetsView/utils"

export const transformActivityTypesIntoOption = (data?: ActivityType[]): AsyncOption[] => {
  if (!data) {
    return []
  }
  return data.map((item) => ({
    value: item._id,
    label: item.type,
  }))
}

export const transformExerciseIntoOption = (data?: Exercise[]): AsyncOption[] => {
  if (!data) {
    return []
  }

  return data.map((item) => ({
    value: item._id,
    label: item.name,
    isStatic: item.isStatic,
    additionalInfo: item.additionalInfo,
  }))
}

export const transformEditedActivity = (activity: Activity) => {
  const {
    type: { type, _id },
    title,
    exertionRating,
    notes,
    warmup,
    repeatExercisesCount,
    exercises,
    date,
  } = activity

  const activityType = {
    label: type,
    value: _id,
  }

  const transformedActivity = {
    title,
    activityType,
    exertionRating,
    notes,
    warmup,
    repeatExercisesCount,
    exercises: transformResponseExercises(exercises),
    date: new Date(date),
  }

  return transformedActivity
}

export const getDataToSubmit = (values: AddActivityFormTypes, isPreset?: boolean) => {
  const {
    title,
    activityType,
    date,
    notes,
    repeatExercisesCount,
    warmup,
    exercises,
    exertionRating,
  } = values

  const transformedExercises = exercises?.map((exercise) => {
    return {
      ...exercise,
      exercise: exercise.exercise.value,
    }
  })
  const dataToSubmit: CreateActivityData = {
    title,
    type: activityType.value,
    date,
    notes,
    exertionRating,
    warmup,
    repeatExercisesCount,
    exercises: transformedExercises,
    isPreset,
  }

  return dataToSubmit
}

export const getSubmitButtonText = (
  buttonAction: "preset" | "addEdit",
  isEditing: boolean,
  isPreset?: boolean
) => {
  switch (buttonAction) {
    case "preset":
      if (isEditing) {
        return isPreset ? "Delete from presets" : "Mark as preset"
      } else {
        return "Add and save"
      }
    case "addEdit":
      return isEditing ? "Edit" : "Add"
  }
}
