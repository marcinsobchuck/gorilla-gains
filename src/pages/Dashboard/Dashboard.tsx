import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { UserInfo } from "./components/UserInfo/UserInfo"

export const Dashboard = () => {
  return (
    <>
      <Sidebar>
        <UserInfo />
      </Sidebar>
      <MainContentWrapper>Dashboard</MainContentWrapper>{" "}
    </>
  )
}
