import { parseISO } from "date-fns"
import { useState } from "react"
import { useTheme } from "styled-components"

import {
  ActivityName,
  ButtonsWrapper,
  PlannedIdicator,
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
}) => {
  const [temporaryStatus, setTemporaryStatus] = useState(!activity.isDone)
  const [isHovering, setIsHovering] = useState(false)
  const theme = useTheme()

  const handleOnCardStatusChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    await onCardStatusChange()
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

  return (
    <Wrapper
      key={activity._id}
      $isActive={isActive}
      $isLoading={isLoading}
      $buttonState={isActivityEventInFuture ? "planned" : activity.isDone}
      align='center'
      justify='space-between'
      onClick={onCardClick}
    >
      <ActivityName>{activity.title}</ActivityName>
      {isActivityEventInFuture ? (
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
      )}
    </Wrapper>
  )
}
