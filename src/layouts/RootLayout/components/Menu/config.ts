import { Routes } from "@enums/routes.enum"

import { ListItem, SettingOption } from "./Menu.types"

export const listItems: ListItem[] = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: Routes.DASHBOARD,
  },
  {
    name: "History",
    icon: "history",
    path: Routes.ACTIVITY_HISTORY,
  },
  {
    name: "Calendar",
    icon: "calendar",
    path: Routes.CALENDAR,
  },
  {
    name: "Exercises catalogue",
    icon: "collection",
    path: Routes.EXERCISES_CATALOGUE,
  },
]

export const settingsOptions: SettingOption[] = [
  {
    icon: "account",
    name: "Account",
    to: `${Routes.SETTINGS}#account-information-section`,
  },
  {
    icon: "privacy",
    name: "Privacy",
    to: `${Routes.SETTINGS}#user-settings-section`,
  },
]
