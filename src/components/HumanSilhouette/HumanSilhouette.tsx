import { useCallback, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import humanFrontBack from "@assets/humanFrontBack.svg"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"

import {
  HumanModelSVG,
  LegendDot,
  LegendItem,
  LegendText,
  LegendWrapper,
  SkeletonWrapper,
} from "./HumanSilhouette.styled"
import { HumanSilhouetteProps } from "./HumanSilhouette.types"
import { addClassToElements, getClassesString, removeClassFromElements } from "./utils"

const Loader = () => {
  return (
    <SkeletonWrapper justify='center' align='center' direction='column' gap={12}>
      <SkeletonTheme>
        <Skeleton
          height='100%'
          width='50%'
          count={2}
          containerClassName='silhouetteSkeleton'
          borderRadius={18}
          inline
        />
      </SkeletonTheme>
    </SkeletonWrapper>
  )
}

export const HumanSilhouette: React.FC<HumanSilhouetteProps> = ({
  musclesHit,
  withLegend = true,
  className,
}) => {
  const theme = useTheme()

  const updateClasses = useCallback(() => {
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
  }, [musclesHit])

  useEffect(() => {
    const activeElements = document.querySelectorAll(".active-primary, .active-secondary")
    removeClassFromElements(activeElements, "active-primary")
    removeClassFromElements(activeElements, "active-secondary")

    updateClasses()
  }, [musclesHit, updateClasses])

  const renderLegend = () => {
    if (
      !withLegend ||
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
    <FlexContainer direction='column' justify='center' align='center' className={className}>
      <HumanModelSVG src={humanFrontBack} onLoad={updateClasses} loader={<Loader />} />
      {renderLegend()}
    </FlexContainer>
  )
}
