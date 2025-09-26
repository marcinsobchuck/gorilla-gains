import { parseISO } from "date-fns"

import { User } from "@api/types/userService.types"

import { SettingsFormValues } from "./SettingsForm.types"

export const getFormValuesFromCurrentUser = (currentUser: User): SettingsFormValues | undefined => {
  if (!currentUser) return

  const otherValues = { currentPassword: "", passwordConfirmation: "", password: "" }

  const { email, name, surname, dob, gender, height, weight, activityLevel, desiredWeight, dueDateWeight, goals } =
    currentUser
  return {
    ...otherValues,
    email,
    name,
    surname,
    dob: parseISO(dob),
    gender,
    height,
    weight,
    activityLevel,
    desiredWeight,
    ...(dueDateWeight && { dueDateWeight: parseISO(dueDateWeight) }),
    goals,
  }
}

export const getEditedData = (formValues: SettingsFormValues, dirtyFields: (string | undefined)[]) => {
  const editedFields = Object.entries(formValues).reduce<{
    [key in keyof SettingsFormValues]?: SettingsFormValues[keyof SettingsFormValues]
  }>((acc, [key, value]) => {
    if (dirtyFields.includes(key)) {
      acc[key as keyof SettingsFormValues] = value
    }
    return acc
  }, {})
  return editedFields
}
