import { useTheme } from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { ActivityTypes } from "@enums/activityTypes.enum"

import {
  ExertionRatingContainer,
  HeaderWrapper,
  Heading,
  IconContainer,
  MainText,
  SecondaryText,
  StyledInteractiveIcon,
  TextContentWrapper,
  Wrapper,
} from "./ActivityCard.styled"

const getIconNamePerActivityType = (type: ActivityTypes) => {
  switch (type) {
    case ActivityTypes.STRENGTH: {
      return "strength"
    }
    case ActivityTypes.ENDURANCE: {
      return "endurance"
    }
    case ActivityTypes.FLEXIBILITY: {
      return "flexibility"
    }
    case ActivityTypes.BALANCE: {
      return "balance"
    }
  }
}

export const ActivityCard = () => {
  const theme = useTheme()
  return (
    <Wrapper>
      <HeaderWrapper justify='space-between' align='center'>
        <Heading>Endurancja testowa</Heading>
        <StyledInteractiveIcon name='threeDots' width={32} height={32} />
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
