import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { CalendarScheduler } from "./components/CalendarScheduler"

export const Calendar = () => {
  return (
    <>
      <Sidebar>Day info</Sidebar>
      <MainContentWrapper>
        <CalendarScheduler />
      </MainContentWrapper>
    </>
  )
}
