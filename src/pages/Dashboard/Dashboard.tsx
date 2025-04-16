import { MainContentWrapper } from "@layouts/RootLayout/RootLayout.styled"

import { DashboardGrid } from "./components/DashboardGrid/DashboardGrid"
import { UserInfo } from "./components/UserInfo/UserInfo"
import { StyledSidebar } from "./Dashboard.styled"
export const Dashboard = () => {
  return (
    <>
      <StyledSidebar>
        <UserInfo />
      </StyledSidebar>
      <MainContentWrapper>
        <DashboardGrid />
      </MainContentWrapper>
    </>
  )
}
