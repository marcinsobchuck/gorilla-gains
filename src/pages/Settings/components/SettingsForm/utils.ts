import { parseISO } from "date-fns"

import { User } from "@api/types/userService.types"

import { SettingsFormValues } from "./config"

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
