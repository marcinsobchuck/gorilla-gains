import React from "react"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { Label, StyledInput, Wrapper } from "./DurationInput.styled"
import { DurationInputProps } from "./DurationInput.types"

export const DurationInput: React.FC<DurationInputProps> = ({ id, withHours = true, label }) => {
  const fieldsIds = [`${id}.hours`, `${id}.minutes`, `${id}.seconds`]

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
    </Wrapper>
  )
}
