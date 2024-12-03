import { FormProvider, useForm } from "react-hook-form"

import { AccountInformation } from "./components/AccountInformation/AccountInformation"
import { UserSettings } from "./components/UserSettings/UserSettings"
import { StyledForm } from "./SettingsForm.styled"

export const SettingsForm = () => {
  const methods = useForm({
    defaultValues: {
      goals: [],
    },
    mode: "onChange",
  })

  return (
    <FormProvider {...methods}>
      <StyledForm>
        <AccountInformation />
        <UserSettings />
      </StyledForm>
    </FormProvider>
  )
}
