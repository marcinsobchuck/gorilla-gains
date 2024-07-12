import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"
import { HumanSilhouette } from "@pages/Dashboard/components/DashboardGrid/components/HumanSilhouette/HumanSilhouette"

export const Calendar = () => {
  return (
    <>
      <Sidebar>Day info</Sidebar>
      <MainContentWrapper>
        <HumanSilhouette />
      </MainContentWrapper>
    </>
  )
}
