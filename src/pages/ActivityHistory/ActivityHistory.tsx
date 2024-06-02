import { ToastContainer } from "react-toastify"

import { Calendar } from "@components/Calendar/Calendar"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivitiesInfo } from "./components/ActivitiesInfo/ActivitiesInfo"
import { ActivityList } from "./components/ActivityList/ActivityList"
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader"

export const ActivityHistory = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader title='History' />
        <Calendar />
      </Sidebar>
      <MainContentWrapper>
        <ActivityList />
        <ActivitiesInfo />
      </MainContentWrapper>
      <ToastContainer />
    </>
  )
}
