import { ToastContainer } from "react-toastify"

import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivityList } from "./components/ActivityList/ActivityList"

export const ActivityHistory = () => {
  return (
    <>
      <Sidebar>History</Sidebar>
      <MainContentWrapper>
        <ActivityList />
      </MainContentWrapper>
      <ToastContainer />
    </>
  )
}
