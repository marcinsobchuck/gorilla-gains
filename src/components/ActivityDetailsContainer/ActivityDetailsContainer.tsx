import { useTheme } from "styled-components"

import { ActivityDetails } from "@components/ActivityDetails/ActivityDetails"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { ButtonsWrapper, StyledButton, Wrapper } from "./ActivityDetailsContainer.styled"
import { ActivityDetailsContainerProps } from "./ActivtyDetailsContainer.types"

export const ActivityDetailsContainer = ({
  isOpen,
  onClose,
  onEdit,
  onRemove,
  activeActivityEvent,
}: ActivityDetailsContainerProps) => {
  const theme = useTheme()

  const handleRemoveActivity = () => {
    if (
      confirm(`Are sure you want to delete this activity? ${activeActivityEvent?.title}`) === false
    ) {
      return
    } else {
      onRemove()
    }
  }

  return (
    <Wrapper $isOpen={isOpen}>
      <ButtonsWrapper justify='space-between'>
        <StyledButton
          variant='tertiary'
          buttonType='button'
          icon='leftArrow'
          onClick={onClose}
          color={theme.secondary}
        />
        {activeActivityEvent && (
          <FlexContainer>
            <StyledButton variant='tertiary' buttonType='button' icon='edit' onClick={onEdit}>
              Edit
            </StyledButton>
            <StyledButton
              variant='tertiary'
              buttonType='button'
              icon='remove'
              onClick={handleRemoveActivity}
            >
              Delete
            </StyledButton>
          </FlexContainer>
        )}
      </ButtonsWrapper>

      {activeActivityEvent && <ActivityDetails activityDetails={activeActivityEvent} />}
    </Wrapper>
  )
}
