import { IconName } from "../../../components/Icon/Icon.types"

export interface ListItem {
  name: "Dashboard" | "History" | "Calendar"
  icon: IconName
  path: "/" | "activityHistory" | "calendar"
}
