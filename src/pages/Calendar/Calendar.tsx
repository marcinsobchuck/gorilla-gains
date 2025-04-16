import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { CalendarScheduler } from "./components/CalendarScheduler/CalendarScheduler"
import { DayInfo } from "./components/DayInfo/DayInfo"

export const Calendar = () => {
  return (
    <>
      <Sidebar>
        <DayInfo />
      </Sidebar>
      <MainContentWrapper>
        <CalendarScheduler />
      </MainContentWrapper>
    </>
  )
}
