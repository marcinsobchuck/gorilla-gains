import { Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { FormNavigation } from "./components/FormNavigation/FormNavigation"
import { SettingsForm } from "./components/SettingsForm/SettingsForm"
import { StyledMainContentWrapper } from "./Settings.styled"

export const Settings = () => {
  return (
    <>
      <Sidebar>
        <FormNavigation />
      </Sidebar>
      <StyledMainContentWrapper>
        <SettingsForm />
      </StyledMainContentWrapper>
    </>
  )
}
