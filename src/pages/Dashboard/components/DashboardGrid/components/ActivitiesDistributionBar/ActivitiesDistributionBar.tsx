import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { DefaultTheme, useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityEventColor } from "@features/utils/utils"

import {
  ActivitiesDistributionWrapper,
  ActivityTypeBar,
  ActivityTypeText,
  BarWrapper,
  HeadingWrapper,
} from "./ActivitiesDistributionBar.styled"
import { BarChartTooltipWrapper } from "../ActivitiesBarChart/ActivitiesBarChart.styled"

const getSecondaryColor = ({
  activityType,
  theme,
}: {
  activityType: ActivityTypes
  theme: DefaultTheme
}) => {
  switch (activityType) {
    case ActivityTypes.BALANCE:
      return theme.balanceEventColorSecondary
    case ActivityTypes.STRENGTH:
      return theme.strengthEventColorSecondary
    case ActivityTypes.ENDURANCE:
      return theme.enduranceEventColorSecondary
    case ActivityTypes.FLEXIBILITY:
      return theme.flexibilityEventColorSecondary
  }
}

export const ActivitiesDistributionBar = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const theme = useTheme()
  const chartData = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activityTypeDistribution
  )
  const chartDataStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)

  if (chartDataStatus === RequestStatuses.LOADING || !chartData) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  if (!chartData || chartDataStatus === RequestStatuses.FAILED) {
    return <div>Something wrong happened</div>
  }

  const totalActivitiesDone = chartData.totalDone
  let currentPosition = 0

  return (
    <ActivitiesDistributionWrapper direction='column'>
      <HeadingWrapper justify='space-between'>
        <p>Activities done % distribution</p>
        <p>
          Total done<span>{totalActivitiesDone}</span>
        </p>
      </HeadingWrapper>
      <BarWrapper ref={setAnchor}>
        {chartData.distributionPerActivityType.map((activityType, index) => {
          const width = (activityType.value / totalActivitiesDone) * 100
          const left = currentPosition
          currentPosition += width
          return (
            <ActivityTypeBar
              key={index}
              $width={width}
              $left={left}
              $color={getActivityEventColor(activityType.name, theme)}
              justify='center'
              align='center'
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setIsTooltipOpen(false)}
            >
              <Icon
                name={activityType.name}
                color={getSecondaryColor({ activityType: activityType.name, theme })}
                width={18}
                height={18}
              />
              {width > 6 && (
                <ActivityTypeText
                  $secondaryColor={getSecondaryColor({ activityType: activityType.name, theme })}
                >
                  {width.toFixed()}%
                </ActivityTypeText>
              )}
            </ActivityTypeBar>
          )
        })}
      </BarWrapper>

      {anchor && isTooltipOpen && (
        <Popover
          anchor={anchor}
          offsetAway={-30}
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
        >
          <BarChartTooltipWrapper direction='column' gap={6}>
            {chartData.distributionPerActivityType.map((activityType) => (
              <FlexContainer justify='space-between' key={activityType.name}>
                <ActivityTypeText $secondaryColor={getActivityEventColor(activityType.name, theme)}>
                  {activityType.name}
                </ActivityTypeText>
                <ActivityTypeText $secondaryColor={getActivityEventColor(activityType.name, theme)}>
                  {activityType.value}
                </ActivityTypeText>
              </FlexContainer>
            ))}
            <FlexContainer justify='space-between'>
              <ActivityTypeText>Total</ActivityTypeText>
              <ActivityTypeText>{totalActivitiesDone}</ActivityTypeText>
            </FlexContainer>
          </BarChartTooltipWrapper>
        </Popover>
      )}
    </ActivitiesDistributionWrapper>
  )
}
