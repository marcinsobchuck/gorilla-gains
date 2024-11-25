import { useState } from "react"
import { useTheme } from "styled-components"

import { ActivityName, ButtonsWrapper, StatusButton, Wrapper } from "./ActivityEventCard.styled"
import { ActivityEventCardProps } from "./ActivityEventCard.types"

export const ActivityEventCard: React.FC<ActivityEventCardProps> = ({
  activity,
  isActive,
  onCardClick,
  onCardStatusChange,
}) => {
  const [temporaryStatus, setTemporaryStatus] = useState(!activity.isDone)
  const [isHovering, setisHovering] = useState(false)
  const theme = useTheme()

  const handleOnCardStatusChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCardStatusChange()
    setisHovering(false)
  }

  const handleButtonHover = () => {
    setisHovering(true)
    setTemporaryStatus((prev) => !prev)
  }

  const handleButtonLeave = () => {
    setisHovering(false)
    if (temporaryStatus !== activity.isDone) {
      return
    } else {
      setTemporaryStatus((prev) => !prev)
    }
  }

  return (
    <Wrapper
      key={activity._id}
      $isActive={isActive}
      align='center'
      justify='space-between'
      onClick={onCardClick}
    >
      <ActivityName>{activity.title}</ActivityName>
      <ButtonsWrapper
        $status={temporaryStatus}
        $isHovering={isHovering}
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
        />
      </ButtonsWrapper>
    </Wrapper>
  )
}
