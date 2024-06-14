import { ToastContainer } from "react-toastify"

import { Calendar } from "@components/Calendar/Calendar"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivitiesInfo } from "./components/ActivitiesInfo/ActivitiesInfo"
import { ActivityList } from "./components/ActivityList/ActivityList"
import { ChartFilters } from "./components/ChartFilters/ChartFilters"
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader"

export const ActivityHistory = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader title='History' />
        <Calendar />
        <ChartFilters />
      </Sidebar>
      <MainContentWrapper>
        <ActivityList />
        <ActivitiesInfo />
      </MainContentWrapper>
      <ToastContainer />
    </>
  )
}
