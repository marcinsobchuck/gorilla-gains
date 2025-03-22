import { format, parseISO } from "date-fns"
import React, { useState } from "react"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { Popover } from "@components/Popover/Popover"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  ExertionRatingContainer,
  HeaderWrapper,
  Heading,
  LoaderOverlay,
  PopoverOption,
  PopoverOptions,
  StyledInteractiveIcon,
  Wrapper,
} from "./ActivityCard.styled"
import { ActivityCardProps } from "./ActivityCard.types"

export const ActivityCard: React.FC<ActivityCardProps> = ({
  data,
  popoverOptions,
  hasAdditionalActions = true,
  ...rest
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const state = useAppSelector((state) => state.activities)
  const currentProcessedActivityId = useAppSelector(
    (state) => state.activities.currentlyProcessedActivityId
  )
  const theme = useTheme()
  const numberOfExercises = data.exercises.length
  const isLoading =
    (state.editActivityStatus === RequestStatuses.LOADING ||
      state.deleteActivityStatus === RequestStatuses.LOADING) &&
    currentProcessedActivityId === data._id

  return (
    <Wrapper
      $bgGradient={getDataForActivityType(data.type.type, theme).cardGradient}
      direction='column'
      justify='center'
      {...rest}
    >
      <HeaderWrapper justify='space-between' align='center'>
        <Heading>{data.title}</Heading>
        {hasAdditionalActions && (
          <div
            ref={setAnchor}
            onClick={(e) => {
              e.stopPropagation()
              setIsPopoverOpen((prev) => !prev)
            }}
          >
            <StyledInteractiveIcon name='threeDots' width={32} height={32} />
          </div>
        )}

        {anchor && isPopoverOpen && (
          <Popover
            anchor={anchor}
            placement='bottom-end'
            offsetAway={-32}
            onClickOutside={() => setIsPopoverOpen(false)}
          >
            <PopoverOptions>
              {popoverOptions?.map((item, index) => (
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
      <FlexContainer align='center' justify='space-between'>
        <ActivityTypeBadge
          activityType={data.type.type}
          title={
            <>
              {capitalizeFirstLetter(data?.type?.type)} <span>&#8226;</span> {numberOfExercises}{" "}
              {numberOfExercises === 1 ? "exercise" : "exercises"}
            </>
          }
          subtitle={"date" in data ? format(parseISO(data.date), "LLLL do, y") : undefined}
          iconSize={30}
        />

        <ExertionRatingContainer align='flex-end' direction='column'>
          <FlexContainer>
            {Array.from({ length: data.exertionRating || 0 }).map((_, index) => (
              <Icon
                key={index}
                name='fire'
                color={getDataForActivityType(data.type.type, theme).secondaryColor}
                width={22}
                height={22}
              />
            ))}
          </FlexContainer>
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
