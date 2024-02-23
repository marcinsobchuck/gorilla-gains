import get from "lodash.get"
import React from "react"
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { DurationError, Label, StyledInput, Wrapper } from "./DurationInput.styled"
import { DurationInputProps } from "./DurationInput.types"

export const getErrorMessage = (errorObject: FieldErrors<FieldValues>, id: string) => {
  const error = get(errorObject, id)

  if (!error) return

  if (error?.root) {
    return error?.root?.message?.toString()
  }

  return error?.message?.toString()
}

export const DurationInput: React.FC<DurationInputProps> = ({ id, withHours = true, label }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const fieldsIds = [`${id}.hours`, `${id}.minutes`, `${id}.seconds`, "duration", id]
  const isError = Boolean(get(errors, id))
  const errorMessage = getErrorMessage(errors, id)

  return (
    <Wrapper direction='column'>
      {label && <Label htmlFor={`${id}.hours`}>{label}</Label>}
      <FlexContainer>
        {withHours && (
          <StyledInput
            id={`${id}.hours`}
            type='number'
            label='hours'
            withIcon={false}
            triggerValidationFor={fieldsIds}
          />
        )}
        <StyledInput
          id={`${id}.minutes`}
          type='number'
          label='minutes'
          withIcon={false}
          triggerValidationFor={fieldsIds}
        />
        <StyledInput
          id={`${id}.seconds`}
          type='number'
          label='seconds'
          withIcon={false}
          triggerValidationFor={fieldsIds}
        />
      </FlexContainer>
      <DurationError $isVisible={isError}>{errorMessage}</DurationError>
    </Wrapper>
  )
}
