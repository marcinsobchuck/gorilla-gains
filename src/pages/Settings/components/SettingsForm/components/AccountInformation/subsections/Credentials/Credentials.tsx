import { useFormContext } from "react-hook-form"

import { Input } from "@components/Input/Input"
import { InputAsync } from "@components/InputAsync/InputAsync"

import { accountInformationInputsData } from "./config"

const currentPasswordDependantInputs = ["password", "passwordConfirmation", "email"]

export const Credentials = () => {
  const {
    getValues,
    formState: { errors, validatingFields },
  } = useFormContext()

  const currentPassword = getValues("currentPassword")
  const isCurrentPasswordValidating = validatingFields["currentPassword"]

  return accountInformationInputsData.map((input) => {
    const { id, label, type, isAsync } = input
    const isPasswordInvalid =
      !!errors["currentPassword"] || !currentPassword || isCurrentPasswordValidating

    const isDisabled = isPasswordInvalid && currentPasswordDependantInputs.includes(input.id)

    const commonProps = {
      id,
      label,
      type,
      isDisabled,
    }

    console.log(isCurrentPasswordValidating)

    return isAsync ? (
      <InputAsync key={id} withIcon={!isCurrentPasswordValidating} {...commonProps} />
    ) : (
      <Input key={id} {...commonProps} />
    )
  })
}
