import { Tab, Wrapper } from "./MobileTabNavigation.styled"
import { MobileTabNavigationProps } from "./MobileTabNavigation.types"

export const MobileTabNavigation: React.FC<MobileTabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Wrapper>
      <Tab
        justify='center'
        align='center'
        $isActive={activeTab === "activityHistory"}
        onClick={() => setActiveTab("activityHistory")}
      >
        History
      </Tab>
      <Tab
        justify='center'
        align='center'
        $isActive={activeTab === "insights"}
        onClick={() => setActiveTab("insights")}
      >
        Insights
      </Tab>
    </Wrapper>
  )
}
