import humanFrontBack from "@assets/humanFrontBack.svg"

import { HumanModelSVG, Title } from "./HumanSilhouette.styled"
import { Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

const primaryMusclesHit = [
  "backLats",
  "traps",
  "frontUpperLeg",
  "chest",
  "biceps",
  "glutes",
  "backUpperLeg",
]

const secondaryMusclesHit = ["abs", "backShoulders", "biceps", "shoulders", "forearm", "obliques"]

const getClassesString = (arr: string[]) => {
  return arr.map((el) => `.${el}`).join(", ")
}

const addClassToElements = (elements: NodeListOf<Element>, className: string) => {
  elements.forEach((el) => el.classList.add(className))
}

export const HumanSilhouette = () => {
  const handleSVGLoad = () => {
    const primaryClasses = document.querySelectorAll(getClassesString(primaryMusclesHit))
    const secondaryClasses = document.querySelectorAll(getClassesString(secondaryMusclesHit))

    addClassToElements(primaryClasses, "active-primary")
    addClassToElements(secondaryClasses, "active-secondary")
  }

  return (
    <Wrapper direction='column'>
      <HumanModelSVG src={humanFrontBack} onLoad={handleSVGLoad} />

      <Title>Muscles hit past 7 days</Title>
    </Wrapper>
  )
}
