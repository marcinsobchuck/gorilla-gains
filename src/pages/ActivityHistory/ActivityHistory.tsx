import { useEffect, useRef, useState } from "react"

import { Breakpoints } from "@enums/breakpoints.enum"
import { useMediaQuery } from "@hooks/useMediaQuery"

import { StyledMainContentWrapper, StyledSidebar } from "./ActivityHistory.styled"
import { MobileTab } from "./ActivityHistory.types"
import { ActivitiesInfo } from "./components/ActivitiesInfo/ActivitiesInfo"
import { ActivityList } from "./components/ActivityList/ActivityList"
import { ChartFilters } from "./components/ChartFilters/ChartFilters"
import { HistoryCalendar } from "./components/HistoryCalendar/HistoryCalendar"
import { MobileTabNavigation } from "./components/MobileTabNavigation/MobileTabNavigation"
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader"

export const ActivityHistory = () => {
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>("activityHistory")

  const isMediumDevice = useMediaQuery(Breakpoints.MEDIUM)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMediumDevice) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [activeMobileTab, isMediumDevice])

  return (
    <>
      <div ref={ref} />
      <StyledSidebar>
        <SidebarHeader title={activeMobileTab === "activityHistory" ? "History" : "Insights"} />
        <HistoryCalendar activeTab={activeMobileTab} />
        <ChartFilters activeTab={activeMobileTab} />
      </StyledSidebar>
      <StyledMainContentWrapper>
        <ActivityList activeTab={activeMobileTab} />
        <ActivitiesInfo activeTab={activeMobileTab} />
      </StyledMainContentWrapper>
      {!isMediumDevice && (
        <MobileTabNavigation activeTab={activeMobileTab} setActiveTab={setActiveMobileTab} />
      )}
    </>
  )
}
