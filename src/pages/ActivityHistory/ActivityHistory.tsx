import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivitiesInfo } from "./components/ActivitiesInfo/ActivitiesInfo"
import { ActivityList } from "./components/ActivityList/ActivityList"
import { ChartFilters } from "./components/ChartFilters/ChartFilters"
import { HistoryCalendar } from "./components/HistoryCalendar/HistoryCalendar"
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader"

export const ActivityHistory = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader title='History' />
        <HistoryCalendar />
        <ChartFilters />
      </Sidebar>
      <MainContentWrapper>
        <ActivityList />
        <ActivitiesInfo />
      </MainContentWrapper>
    </>
  )
}
