import { Routes } from "@enums/routes.enum"

import { ListItem } from "./Menu.types"

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
]
