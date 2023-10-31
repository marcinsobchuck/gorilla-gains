import { IconName } from "@components/Icon/Icon.types"
import { Routes } from "@enums/routes.enum"

type ItemName = "Dashboard" | "History" | "Calendar"

export interface ListItem {
  name: ItemName
  icon: IconName
  path: Routes.DASHBOARD | Routes.ACTIVITY_HISTORY | Routes.CALENDAR
}
