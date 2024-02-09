import React from "react"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { InputChangeWarningProps } from "./InputChangeWarning.types"
import { InputWarning } from "../../AddActivityForm.styled"

export const InputChangeWarning: React.FC<InputChangeWarningProps> = ({
  isVisible,
  onAccept,
  onDecline,
}) => {
  return (
    isVisible && (
      <InputWarning align='center' justify='space-between'>
        <p>
          This change will reset all exercises. <b>Are you sure?</b>
        </p>

        <FlexContainer>
          <Button buttonType='button' variant='tertiary' onClick={onAccept}>
            Yes
          </Button>
          <Button buttonType='button' variant='tertiary' onClick={onDecline}>
            No
          </Button>
        </FlexContainer>
      </InputWarning>
    )
  )
}
