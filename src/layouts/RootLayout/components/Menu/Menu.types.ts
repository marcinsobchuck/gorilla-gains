import { IconName } from "@components/Icon/Icon.types"
import { Routes } from "@enums/routes.enum"

type ItemName = "Dashboard" | "History" | "Calendar" | "Exercises catalogue"

export interface ListItem {
  name: ItemName
  icon: IconName
  path: Routes.DASHBOARD | Routes.ACTIVITY_HISTORY | Routes.CALENDAR | Routes.EXERCISES_CATALOGUE
}

export interface MenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
