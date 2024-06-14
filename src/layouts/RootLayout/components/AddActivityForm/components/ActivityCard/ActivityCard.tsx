import { format } from "date-fns"
import React, { useState } from "react"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { Popover } from "@components/Popover/Popover"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  ExertionRatingContainer,
  HeaderWrapper,
  Heading,
  IconContainer,
  LoaderOverlay,
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
  const state = useAppSelector((state) => state.activities)
  const currentProcessedActivityId = useAppSelector(
    (state) => state.activities.currentlyProcessedActivityId
  )
  const theme = useTheme()
  const numberOfExercises = data.exercises.length
  const isActive = data._id === state.activeActivity?._id
  const isLoading =
    (state.editActivityStatus === RequestStatuses.LOADING ||
      state.deleteActivityStatus === RequestStatuses.LOADING) &&
    currentProcessedActivityId === data._id

  return (
    <Wrapper $isActive={isActive} {...rest}>
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

          <SecondaryText>{format(new Date(data.date), "LLLL do, y")}</SecondaryText>
        </TextContentWrapper>

        <ExertionRatingContainer align='flex-end' direction='column'>
          <FlexContainer>
            {Array.from({ length: data.exertionRating || 0 }).map((_, index) => (
              <Icon key={index} name='fire' color={theme.secondary} width={22} height={22} />
            ))}
          </FlexContainer>
          <p>Created at {format(new Date(data.createdAt), "dd/MM/yyyy")}</p>
        </ExertionRatingContainer>
      </FlexContainer>
      {isLoading && (
        <LoaderOverlay>
          <LoaderSpinner />
        </LoaderOverlay>
      )}
    </Wrapper>
  )
}
