import { useState } from "react"
import { useTheme } from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"
import { ActivityTypes } from "@enums/activityTypes.enum"

import {
  ExertionRatingContainer,
  HeaderWrapper,
  Heading,
  IconContainer,
  MainText,
  PopoverOption,
  PopoverOptions,
  SecondaryText,
  StyledInteractiveIcon,
  TextContentWrapper,
  Wrapper,
} from "./ActivityCard.styled"
import { getIconNamePerActivityType } from "./utils"

const popoverOptions = ["Delete from presets", "Edit"]

export const ActivityCard = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const theme = useTheme()

  return (
    <Wrapper>
      <HeaderWrapper justify='space-between' align='center'>
        <Heading>Endurancja testowa</Heading>
        <div ref={setAnchor} onClick={() => setIsPopoverOpen((prev) => !prev)}>
          <StyledInteractiveIcon name='threeDots' width={32} height={32} />
        </div>

        {anchor && isPopoverOpen && (
          <Popover
            anchor={anchor}
            placement='bottom-end'
            onClickOutside={() => setIsPopoverOpen(false)}
          >
            <PopoverOptions>
              {popoverOptions.map((item, index) => (
                <PopoverOption key={index}>{item}</PopoverOption>
              ))}
            </PopoverOptions>
          </Popover>
        )}
      </HeaderWrapper>
      <FlexContainer align='center'>
        <IconContainer align='center' justify='center'>
          <Icon
            name={getIconNamePerActivityType(ActivityTypes.ENDURANCE)}
            width={22}
            height={22}
            color={theme.secondary}
          />
        </IconContainer>

        <TextContentWrapper>
          <MainText>
            Endurance <span>&#8226;</span> 6 exercises <span>&#8226;</span> 1h 30min
          </MainText>
          <SecondaryText>Created at 24.03.2024</SecondaryText>
        </TextContentWrapper>

        <ExertionRatingContainer>
          {Array.from({ length: 3 }).map((_, index) => (
            <Icon key={index} name='fire' color={theme.secondary} width={22} height={22} />
          ))}
        </ExertionRatingContainer>
      </FlexContainer>
    </Wrapper>
  )
}
