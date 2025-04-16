import React from "react"
import { useFormContext } from "react-hook-form"

import { Input } from "@components/Input/Input"
import { InputProps } from "@components/Input/Input.types"

import { ValidationSpinner } from "./InputAsync.styled"

export const InputAsync: React.FC<InputProps> = ({ id, ...props }) => {
  const {
    formState: { validatingFields },
  } = useFormContext()

  const isValidating = validatingFields[id]

  return (
    <Input id={id} {...props}>
      {isValidating && <ValidationSpinner height={24} width={24} />}
    </Input>
  )
}
