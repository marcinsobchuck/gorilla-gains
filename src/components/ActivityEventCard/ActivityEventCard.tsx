import { parseISO } from "date-fns"
import { useState } from "react"
import { useTheme } from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  ActivityName,
  ButtonsWrapper,
  PlannedIdicator,
  StackedCard,
  StatusButton,
  Wrapper,
} from "./ActivityEventCard.styled"
import { ActivityEventCardProps } from "./ActivityEventCard.types"

export const ActivityEventCard: React.FC<ActivityEventCardProps> = ({
  activity,
  isActive,
  isLoading,
  onCardClick,
  onCardStatusChange,
  withButton = true,
  stacked = false,
  className,
}) => {
  const [temporaryStatus, setTemporaryStatus] = useState(!activity.isDone)
  const [isHovering, setIsHovering] = useState(false)
  const theme = useTheme()

  const handleOnCardStatusChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCardStatusChange && (await onCardStatusChange())
    setTemporaryStatus(activity.isDone)
    setIsHovering(false)
  }

  const handleButtonHover = () => {
    if (!isLoading) {
      setIsHovering(true)
      setTemporaryStatus((prev) => !prev)
    }
  }

  const handleButtonLeave = () => {
    setIsHovering(false)
    if (temporaryStatus !== activity.isDone || isLoading) {
      return
    } else {
      setTemporaryStatus((prev) => !prev)
    }
  }

  const isActivityEventInFuture = parseISO(activity.date) > new Date()

  const renderStatusChangeButton = () => {
    if (!withButton) return null

    return isActivityEventInFuture ? (
      <PlannedIdicator justify='center' align='center'>
        P
      </PlannedIdicator>
    ) : (
      <ButtonsWrapper
        $status={temporaryStatus}
        $isHovering={isHovering}
        $isLoading={isLoading}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
      >
        <StatusButton
          width={60}
          buttonType='button'
          variant='tertiary'
          icon='checkmark'
          iconColor={theme.successColor}
          onClick={handleOnCardStatusChange}
          tabIndex={-1}
          key={0}
          disabled={isLoading}
        />
        <StatusButton
          width={60}
          buttonType='button'
          variant='tertiary'
          icon='cross'
          iconColor={theme.errorColor}
          onClick={handleOnCardStatusChange}
          tabIndex={-1}
          key={1}
          disabled={isLoading}
        />
      </ButtonsWrapper>
    )
  }

  return (
    <Wrapper
      key={activity._id}
      $isActive={isActive}
      $isLoading={isLoading}
      $buttonState={isActivityEventInFuture ? "planned" : activity.isDone}
      align='center'
      justify='space-between'
      onClick={onCardClick}
      className={className}
    >
      {stacked &&
        Array.from({ length: 2 })
          .fill(1)
          .map((_, i) => <StackedCard key={i} />)}
      <FlexContainer gap={18}>
        <Icon
          name={getDataForActivityType(activity.type.type).iconName}
          color={getDataForActivityType(activity.type.type, theme).primaryColor}
        />
        <ActivityName>{activity.title}</ActivityName>
      </FlexContainer>

      {renderStatusChangeButton()}
    </Wrapper>
  )
}
