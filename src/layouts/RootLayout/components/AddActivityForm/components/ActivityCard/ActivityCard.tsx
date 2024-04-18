import React, { useState } from "react"
import { useTheme } from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"

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
import { ActivityCardProps } from "./ActivityCard.types"
import { getIconNamePerActivityType } from "./utils"
import { capitalizeFirstLetter } from "../../utils"

export const ActivityCard: React.FC<ActivityCardProps> = ({ data, popoverOptions, ...rest }) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const theme = useTheme()

  const numberOfExercises = data.exercises.length

  return (
    <Wrapper {...rest}>
      <HeaderWrapper justify='space-between' align='center'>
        <Heading>{data.title}</Heading>
        <div
          ref={setAnchor}
          onClick={(e) => {
            e.stopPropagation()
            setIsPopoverOpen((prev) => !prev)
          }}
        >
          <StyledInteractiveIcon name='threeDots' width={32} height={32} />
        </div>

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
                  onClick={(e) => {
                    setIsPopoverOpen(false)
                    item.action(e)
                  }}
                >
                  {item.label}
                </PopoverOption>
              ))}
            </PopoverOptions>
          </Popover>
        )}
      </HeaderWrapper>
      <FlexContainer align='center'>
        <IconContainer align='center' justify='center'>
          <Icon
            name={getIconNamePerActivityType(data.type.type)}
            width={22}
            height={22}
            color={theme.secondary}
          />
        </IconContainer>

        <TextContentWrapper>
          <MainText>
            {capitalizeFirstLetter(data.type.type)} <span>&#8226;</span> {numberOfExercises}{" "}
            exercises
          </MainText>

          {data.createdAt && (
            <SecondaryText>
              Created at {new Date(data.createdAt).toLocaleDateString("en-US")}
            </SecondaryText>
          )}
        </TextContentWrapper>

        <ExertionRatingContainer>
          {Array.from({ length: data.exertionRating || 0 }).map((_, index) => (
            <Icon key={index} name='fire' color={theme.secondary} width={22} height={22} />
          ))}
        </ExertionRatingContainer>
      </FlexContainer>
    </Wrapper>
  )
}
