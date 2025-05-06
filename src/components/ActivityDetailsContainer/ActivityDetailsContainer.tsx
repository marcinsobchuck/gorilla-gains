import { useState } from "react"
import { useTheme } from "styled-components"

import { ActivityDetails } from "@components/ActivityDetails/ActivityDetails"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"
import { Breakpoints } from "@enums/breakpoints.enum"
import { useScrollLock } from "@hooks/useLockScroll"
import { useMediaQuery } from "@hooks/useMediaQuery"
import {
  PopoverOption,
  PopoverOptions,
  StyledInteractiveIcon,
} from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard.styled"
import { PopoverOption as PopoverOptionType } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard.types"

import {
  ButtonsWrapper,
  MoreOptionsAnchor,
  MoreText,
  StyledButton,
  Wrapper,
} from "./ActivityDetailsContainer.styled"
import { ActivityDetailsContainerProps } from "./ActivtyDetailsContainer.types"

export const ActivityDetailsContainer = ({
  isOpen,
  onClose,
  onEdit,
  onRemove,
  onPresetCreation,
  activeActivityEvent,
}: ActivityDetailsContainerProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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

  const isMedium = useMediaQuery(Breakpoints.MEDIUM)

  useScrollLock({ autoLock: isOpen && !isMedium })

  const popoverOptions: PopoverOptionType[] = [
    {
      label: "Edit activity",
      action: onEdit,
      icon: "edit",
    },
    {
      label: "Delete activity",
      action: handleRemoveActivity,
      icon: "remove",
    },
    {
      label: "Make preset from",
      action: onPresetCreation,
      icon: "preset",
    },
  ]

  return (
    <Wrapper $isOpen={isOpen}>
      {anchor && isPopoverOpen && (
        <Popover
          anchor={anchor}
          placement='bottom-end'
          offsetAway={-32}
          onClickOutside={() => setIsPopoverOpen(false)}
        >
          <PopoverOptions>
            {popoverOptions.map((item, index) => (
              <PopoverOption
                key={index}
                align='center'
                onClick={(e) => {
                  setIsPopoverOpen(false)
                  item.action(e)
                }}
                gap={9}
              >
                <Icon name={item.icon} />
                {item.label}
              </PopoverOption>
            ))}
          </PopoverOptions>
        </Popover>
      )}
      {activeActivityEvent && (
        <>
          <ButtonsWrapper justify='space-between' align='center'>
            <StyledButton
              variant='tertiary'
              buttonType='button'
              icon='leftArrow'
              onClick={onClose}
              color={theme.secondary}
            />

            {isMedium ? (
              <FlexContainer gap={9}>
                <StyledButton
                  variant='tertiary'
                  buttonType='button'
                  icon='preset'
                  onClick={onPresetCreation}
                >
                  Make preset from
                </StyledButton>
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
            ) : (
              <MoreOptionsAnchor
                ref={setAnchor}
                direction='column'
                align='center'
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPopoverOpen((prev) => !prev)
                }}
              >
                <StyledInteractiveIcon name='threeDots' width={36} height={36} />
                <MoreText>More</MoreText>
              </MoreOptionsAnchor>
            )}
          </ButtonsWrapper>

          <ActivityDetails activityDetails={activeActivityEvent} />
        </>
      )}
    </Wrapper>
  )
}
