import { ListItem } from "./Menu.types"
import { Routes } from "../../../enums/routes.enum"

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
