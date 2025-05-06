export interface MobileTabNavigationProps {
  activeTab: "activityHistory" | "insights"
  setActiveTab: React.Dispatch<React.SetStateAction<"activityHistory" | "insights">>
}
