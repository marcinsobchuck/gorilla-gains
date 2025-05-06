import React from "react"
import { useTheme } from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import { IconWrapper, Subtitle, Title, TitleWrapper, Wrapper } from "./ActivityTypeBadge.styled"
import { ActivityTypeBadgeProps } from "./ActivityTypeBadge.types"

export const ActivityTypeBadge: React.FC<ActivityTypeBadgeProps> = ({
  gap = 12,
  iconPadding = 16,
  iconSize = 20,
  activityType,
  title,
  titleSize = 14,
  subtitle,
}) => {
  const theme = useTheme()
  return (
    <Wrapper align='center' gap={gap}>
      <IconWrapper
        justify='center'
        align='center'
        $padding={iconPadding}
        $bgColor={getDataForActivityType(activityType, theme).primaryColorOpacity}
      >
        <Icon
          width={iconSize}
          height={iconSize}
          color={getDataForActivityType(activityType, theme).primaryColor}
          name={getDataForActivityType(activityType).iconName}
        />
      </IconWrapper>
      {title && (
        <TitleWrapper>
          <Title $titleSize={titleSize}>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleWrapper>
      )}
    </Wrapper>
  )
}
