import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { InferType } from "yup"

import { useAppDispatch } from "@app/hooks"
import { Input } from "@components/Input/Input"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { forgotPasswordAction } from "@features/auth/authActions"

import { forgotPasswordSchema } from "./config"
import { StyledButton } from "../../ChangePassword/components/ChangePasswordForm.styled"

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch()

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<InferType<typeof forgotPasswordSchema>> = async ({ email }) => {
    await dispatch(forgotPasswordAction(email))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id='email' label='Email' type='text' />
        <StyledButton buttonType='button' width={200} type='submit' disabled={isSubmitting}>
          {isSubmitting ? <LoaderSpinner /> : "Send link"}
        </StyledButton>
      </form>
    </FormProvider>
  )
}
