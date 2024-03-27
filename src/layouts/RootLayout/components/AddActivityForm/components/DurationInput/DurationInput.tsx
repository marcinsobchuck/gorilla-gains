import React from "react"
import { useFormContext } from "react-hook-form"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { DurationError, Label, StyledInput, Wrapper } from "./DurationInput.styled"
import { DurationInputProps } from "./DurationInput.types"

export const DurationInput: React.FC<DurationInputProps> = ({ id, withHours = true, label }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldsIds = [`${id}.hours`, `${id}.minutes`, `${id}.seconds`, id]
  console.log(id)
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
      <DurationError errors={errors} name={id} />
    </Wrapper>
  )
}
