import uniqBy from "lodash.uniqby"

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

export const transformExerciseIntoOption = ({
  activityTypeId,
  data,
  inputValue,
}: {
  activityTypeId: string
  data: Exercise[]
  inputValue?: string
}): AsyncOption[] => {
  if (!data) {
    return []
  }

  const filteredData = data.filter((ex) => {
    return (
      activityTypeId.includes(ex.activityType._id) &&
      ex.name.toLowerCase().includes(inputValue?.trim().toLowerCase() || "")
    )
  })

  return uniqBy(
    filteredData.map((item) => ({
      value: item._id,
      label: item.name,
      isStatic: item.isStatic,
      additionalInfo: item.additionalInfo,
      isFavourite: item.isFavourite,
    })),
    (option) => option.value
  )
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

export const getDataToSubmit = (values: AddActivityFormTypes) => {
  const { activityType, exercises, ...rest } = values

  const transformedExercises = exercises?.map((exercise) => {
    return {
      ...exercise,
      exercise: exercise.exercise.value,
    }
  })

  const dataToSubmit: CreateActivityData = {
    ...rest,
    type: activityType.value,
    exercises: transformedExercises,
  }

  return dataToSubmit
}
