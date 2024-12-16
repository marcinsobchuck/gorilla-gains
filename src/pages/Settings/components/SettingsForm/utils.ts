import { parseISO } from "date-fns"

import { User } from "@api/types/userService.types"

import { SettingsFormValues } from "./SettingsForm.types"

export const getFormValuesFromCurrentUser = (currentUser: User): SettingsFormValues | undefined => {
  if (!currentUser) return
  const {
    email,
    name,
    surname,
    dob,
    gender,
    height,
    weight,
    activityLevel,
    desiredWeight,
    dueDateWeight,
    goals,
  } = currentUser
  return {
    email,
    password: "",
    passwordConfirmation: "",
    name,
    surname,
    dob: parseISO(dob),
    gender,
    height,
    weight,
    activityLevel,
    desiredWeight,
    dueDateWeight: parseISO(dueDateWeight),
    goals,
  }
}

export const getEditedData = (
  formValues: SettingsFormValues,
  dirtyFields: (string | undefined)[]
) => {
  const editedFields = Object.entries(formValues).reduce<{
    [key in keyof typeof formValues]?: (typeof formValues)[keyof typeof formValues]
  }>((acc, [key, value]) => {
    if (dirtyFields.includes(key)) {
      acc[key as keyof typeof formValues] = value
    }
    return acc
  }, {})
  return editedFields
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omitKeysFromObject = (obj: Record<string, any>, keysToOmit: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)))
