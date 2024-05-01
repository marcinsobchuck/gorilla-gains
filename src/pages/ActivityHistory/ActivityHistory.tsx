import { ToastContainer } from "react-toastify"

import { Calendar } from "@components/Calendar/Calendar"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivityList } from "./components/ActivityList/ActivityList"

export const ActivityHistory = () => {
  return (
    <>
      <Sidebar>
        <h1>History</h1>
        <Calendar />
      </Sidebar>
      <MainContentWrapper>
        <ActivityList />
      </MainContentWrapper>
      <ToastContainer />
    </>
  )
}
