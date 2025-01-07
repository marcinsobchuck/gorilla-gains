import React from "react"
import { useFormContext } from "react-hook-form"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"
import { useMediaQuery } from "@hooks/useMediaQuery"

import { DurationError, Label, StyledInput, Wrapper } from "./DurationInput.styled"
import { DurationInputProps } from "./DurationInput.types"

export const DurationInput: React.FC<DurationInputProps> = ({
  id,
  withHours = true,
  label,
  className,
}) => {
  const isMedium = useMediaQuery(Breakpoints.MEDIUM)

  const {
    formState: { errors },
  } = useFormContext()

  const fieldsIds = [`${id}.hours`, `${id}.minutes`, `${id}.seconds`, id]
  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={`${id}.hours`}>{label}</Label>}
      <FlexContainer>
        {withHours && (
          <StyledInput
            id={`${id}.hours`}
            type='number'
            label={isMedium ? "hours" : "H"}
            withIcon={false}
            triggerValidationFor={fieldsIds}
          />
        )}
        <StyledInput
          id={`${id}.minutes`}
          type='number'
          label={isMedium ? "minutes" : "m"}
          withIcon={false}
          triggerValidationFor={fieldsIds}
        />
        <StyledInput
          id={`${id}.seconds`}
          type='number'
          label={isMedium ? "seconds" : "s"}
          withIcon={false}
          triggerValidationFor={fieldsIds}
        />
      </FlexContainer>
      <DurationError errors={errors} name={id} />
    </Wrapper>
  )
}
