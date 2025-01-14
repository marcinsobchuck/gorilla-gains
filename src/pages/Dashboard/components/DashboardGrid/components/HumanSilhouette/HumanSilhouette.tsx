import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import humanFrontBack from "@assets/humanFrontBack.svg"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  HumanModelSVG,
  LegendDot,
  LegendItem,
  LegendText,
  LegendWrapper,
  Title,
  Wrapper,
} from "./HumanSilhouette.styled"
import { addClassToElements, getClassesString } from "./utils"

export const HumanSilhouette = () => {
  const theme = useTheme()
  const musclesHit = useAppSelector((state) => state.activitiesSummary.musclesHit)
  const status = useAppSelector((state) => state.activitiesSummary.weeklyActivitiesDataStatus)

  const handleSVGLoad = () => {
    if (musclesHit) {
      const primaryClassesString = getClassesString(musclesHit.primary)
      const secondaryClassesString = getClassesString(musclesHit.secondary)

      if (primaryClassesString) {
        const primaryClasses = document.querySelectorAll(primaryClassesString)
        addClassToElements(primaryClasses, "active-primary")
      }

      if (secondaryClassesString) {
        const secondaryClasses = document.querySelectorAll(secondaryClassesString)
        addClassToElements(secondaryClasses, "active-secondary")
      }
    }
  }

  if (status === RequestStatuses.LOADING) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  const renderLegend = () => {
    if (
      !musclesHit ||
      !!Object.entries(musclesHit).filter((entry) => {
        return entry[1].length < 0
      }).length
    )
      return null

    if (Object.entries(musclesHit)) {
      const legendItems = Object.entries(musclesHit).map(([key, value]) => {
        if (value.length > 0) {
          const legendColor =
            key === "primary" ? theme.primaryMusclesColorText : theme.secondaryMusclesColorText
          return (
            <LegendItem key={key} align='center' justify='center'>
              <LegendDot $color={legendColor} />
              <LegendText $color={legendColor}>{key}</LegendText>
            </LegendItem>
          )
        }
        return null
      })
      return (
        <LegendWrapper gap={9} justify='center'>
          {legendItems}
        </LegendWrapper>
      )
    }
  }

  return (
    <Wrapper direction='column' justify='center'>
      <Title>Muscles hit past 7 days</Title>
      <HumanModelSVG src={humanFrontBack} onLoad={handleSVGLoad} />
      {renderLegend()}
    </Wrapper>
  )
}
