import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import humanFrontBack from "@assets/humanFrontBack.svg"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { HumanModelSVG, Title } from "./HumanSilhouette.styled"
import { addClassToElements, getClassesString } from "./utils"
import { Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

export const HumanSilhouette = () => {
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

  if (status === RequestStatuses.LOADING || !musclesHit) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  return (
    <Wrapper direction='column'>
      <HumanModelSVG src={humanFrontBack} onLoad={handleSVGLoad} />

      <Title>Muscles hit past 7 days</Title>
    </Wrapper>
  )
}
