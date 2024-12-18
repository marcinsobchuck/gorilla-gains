import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { changeUserInfoAction, getCurrentUserInfoAction } from "@features/user/userActions"

import { AccountInformation } from "./components/AccountInformation/AccountInformation"
import { UserSettings } from "./components/UserSettings/UserSettings"
import { defaultValues, settingsFormSchema } from "./config"
import { StyledForm, SubmitButton } from "./SettingsForm.styled"
import { getEditedData, getFormValuesFromCurrentUser, omitKeysFromObject } from "./utils"

export const SettingsForm = () => {
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false)
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.data)
  const values = currentUser ? getFormValuesFromCurrentUser(currentUser) : undefined

  const methods = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(settingsFormSchema),
    values,
    context: {
      setIsCurrentPasswordValid,
      isCurrentPasswordValid,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  useEffect(() => {
    const getUserInfo = async () => await dispatch(getCurrentUserInfoAction())

    if (!currentUser) {
      getUserInfo()
    }
  }, [currentUser, dispatch])

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = methods

  const onSubmit = handleSubmit(async (values) => {
    const dirtyFieldsArr = Object.entries(dirtyFields).map(([key, value]) => {
      if (value) {
        return key
      }
    })

    const editedData = getEditedData(values, dirtyFieldsArr)

    const submitEditData = omitKeysFromObject(editedData, [
      "currentPassword",
      "passwordConfirmation",
    ])

    await toast.promise(dispatch(changeUserInfoAction(submitEditData)), {
      pending: "Editing...",
      success: "Successfully edited",
      error: "Edition failed",
    })
  })

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit}>
        <AccountInformation />
        <UserSettings />
        <SubmitButton variant='primary' buttonType='button' type='submit' width={140}>
          Save
        </SubmitButton>
      </StyledForm>
    </FormProvider>
  )
}
