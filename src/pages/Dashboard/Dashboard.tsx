import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { DashboardGrid } from "./components/DashboardGrid/DashboardGrid"
import { UserInfo } from "./components/UserInfo/UserInfo"
export const Dashboard = () => {
  return (
    <>
      <Sidebar>
        <UserInfo />
      </Sidebar>
      <MainContentWrapper>
        <DashboardGrid />
      </MainContentWrapper>
    </>
  )
}
