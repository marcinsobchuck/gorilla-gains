import { useFormContext } from "react-hook-form"

import { Input } from "@components/Input/Input"

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
    const { id, label, type } = input
    const isCurrentPassword = input.id === "currentPassword"
    const isPasswordInvalid =
      !!errors["currentPassword"] || !currentPassword || isCurrentPasswordValidating

    const isDisabled = isPasswordInvalid && currentPasswordDependantInputs.includes(input.id)

    return (
      <Input
        key={id}
        id={id}
        label={label}
        type={type}
        isAsync={isCurrentPassword}
        isDisabled={isDisabled}
      />
    )
  })
}
