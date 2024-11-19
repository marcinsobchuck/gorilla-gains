import { useState } from "react"
import { useTheme } from "styled-components"

import { ActivityName, ButtonsWrapper, StatusButton, Wrapper } from "./ActivityEventCard.styled"
import { ActivityEventCardProps } from "./ActivityEventCard.types"

type ButtonStatus = "done" | "not-done"

export const ActivityEventCard: React.FC<ActivityEventCardProps> = ({
  activity,
  isActive,
  onCardClick,
  onCardStatusChange,
}) => {
  const [status, setStatus] = useState<ButtonStatus>("not-done")
  const [temporaryStatus, setTemporaryStatus] = useState<ButtonStatus>("done")
  const [isHovering, setisHovering] = useState(false)
  const theme = useTheme()

  const toggleStatus = (status: ButtonStatus) => (status === "done" ? "not-done" : "done")

  const handleOnCardStatusChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCardStatusChange()
    setStatus(toggleStatus(status))
    setisHovering(false)
  }

  const handleButtonHover = () => {
    setisHovering(true)
    setTemporaryStatus(toggleStatus(temporaryStatus))
  }

  const handleButtonLeave = () => {
    setisHovering(false)
    if (temporaryStatus !== status) {
      return
    } else {
      setTemporaryStatus(toggleStatus(temporaryStatus))
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
