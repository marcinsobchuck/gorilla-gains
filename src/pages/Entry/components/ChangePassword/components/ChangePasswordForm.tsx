import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { InferType } from "yup"

import { useAppDispatch } from "@app/hooks"
import { Input } from "@components/Input/Input"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { changeUserPasswordAction } from "@features/user/userActions"

import { StyledButton } from "./ChangePasswordForm.styled"
import { changePasswordSchema } from "./config"
import { useIsPasswordResetTokenValid } from "../hooks"

export const ChangePasswordForm = () => {
  const dispatch = useAppDispatch()
  const { isTokenValid, token } = useIsPasswordResetTokenValid()

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(changePasswordSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<InferType<typeof changePasswordSchema>> = async ({ password }) => {
    if (token && isTokenValid) {
      await dispatch(changeUserPasswordAction({ password, token }))
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id='password' label='New password' type='password' />
        <Input id='passwordConfirmation' label='Confirm password' type='password' />
        <StyledButton buttonType='button' width={200} type='submit' disabled={isSubmitting}>
          {isSubmitting ? <LoaderSpinner /> : "Save"}
        </StyledButton>
      </form>
    </FormProvider>
  )
}
