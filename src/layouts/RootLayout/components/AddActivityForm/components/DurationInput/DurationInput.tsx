import React from "react"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { Label, StyledInput, Wrapper } from "./DurationInput.styled"
import { DurationInputProps } from "./DurationInput.types"

export const DurationInput: React.FC<DurationInputProps> = ({ withHours = true }) => {
  return (
    <Wrapper direction='column'>
      <Label htmlFor='duration.hours'>Duration</Label>
      <FlexContainer>
        {withHours && (
          <StyledInput id='duration.hours' type='number' label='hours' withIcon={false} />
        )}
        <StyledInput id='duration.minutes' type='number' label='minutes' withIcon={false} />
        <StyledInput id='duration.seconds' type='number' label='seconds' withIcon={false} />
      </FlexContainer>
    </Wrapper>
  )
}
