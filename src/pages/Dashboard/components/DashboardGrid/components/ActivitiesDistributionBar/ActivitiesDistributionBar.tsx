import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  ActivitiesDistributionWrapper,
  ActivityTypeBar,
  ActivityTypeText,
  BarWrapper,
  HeadingText,
  HeadingWrapper,
} from "./ActivitiesDistributionBar.styled"
import { NoDataMessage } from "../../DashboardGrid.styled"
import { BarChartTooltipWrapper } from "../ActivitiesBarChart/ActivitiesBarChart.styled"

export const ActivitiesDistributionBar = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const theme = useTheme()
  const chartData = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activityTypeDistribution
  )
  const chartDataStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)

  if (chartDataStatus === RequestStatuses.FAILED) {
    return (
      <ActivitiesDistributionWrapper>
        <BarWrapper justify='center' align='center'>
          <NoDataMessage>Failed to load the data.</NoDataMessage>
        </BarWrapper>
      </ActivitiesDistributionWrapper>
    )
  }

  if (chartDataStatus === RequestStatuses.LOADING) {
    return (
      <ActivitiesDistributionWrapper>
        <SkeletonTheme>
          <Skeleton height='100%' containerClassName='skeletonWrapper' />
        </SkeletonTheme>
      </ActivitiesDistributionWrapper>
    )
  }

  const totalActivitiesDone = chartData?.totalDone

  if (!totalActivitiesDone) {
    return (
      <ActivitiesDistributionWrapper>
        <BarWrapper justify='center' align='center'>
          <NoDataMessage>No activities done.</NoDataMessage>
        </BarWrapper>
      </ActivitiesDistributionWrapper>
    )
  }

  let currentPosition = 0

  return (
    <ActivitiesDistributionWrapper direction='column'>
      <HeadingWrapper justify='space-between'>
        <HeadingText>Activities done % distribution</HeadingText>
        <HeadingText>
          Total done<span>{totalActivitiesDone}</span>
        </HeadingText>
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
              $color={getDataForActivityType(activityType.name, theme).primaryColor}
              justify='center'
              align='center'
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setIsTooltipOpen(false)}
            >
              <Icon
                name={getDataForActivityType(activityType.name).iconName}
                color={getDataForActivityType(activityType.name, theme).secondaryColor}
                width={18}
                height={18}
              />
              {width > 6 && (
                <ActivityTypeText
                  $secondaryColor={getDataForActivityType(activityType.name, theme).secondaryColor}
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
                <ActivityTypeText
                  $secondaryColor={getDataForActivityType(activityType.name, theme).primaryColor}
                >
                  {activityType.name}
                </ActivityTypeText>
                <ActivityTypeText
                  $secondaryColor={getDataForActivityType(activityType.name, theme).primaryColor}
                >
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
