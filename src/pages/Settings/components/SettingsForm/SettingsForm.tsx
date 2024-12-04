import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getCurrentUserInfoAction } from "@features/user/userActions"

import { AccountInformation } from "./components/AccountInformation/AccountInformation"
import { UserSettings } from "./components/UserSettings/UserSettings"
import { defaultValues, settingsFormSchema } from "./config"
import { StyledForm, SubmitButton } from "./SettingsForm.styled"
import { getFormValuesFromCurrentUser } from "./utils"

export const SettingsForm = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.data)
  const values = currentUser ? getFormValuesFromCurrentUser(currentUser) : undefined

  const methods = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(settingsFormSchema),
    values,
  })

  useEffect(() => {
    const getUserInfo = async () => await dispatch(getCurrentUserInfoAction())

    if (!currentUser) {
      getUserInfo()
    }
  }, [currentUser, dispatch])

  const { watch, handleSubmit } = methods

  console.log({ watch: watch() })

  const onSubmit = handleSubmit((values) => {
    console.log("LODŻŻIO", { submittedValues: values })
  })

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit}>
        <AccountInformation />
        <UserSettings />
        <SubmitButton variant='primary' buttonType='button' width={140}>
          Save
        </SubmitButton>
      </StyledForm>
    </FormProvider>
  )
}
