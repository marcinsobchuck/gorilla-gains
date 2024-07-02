import humanFrontBack from "@assets/humanFrontBack.svg"

import { HumanModelSVG, Title } from "./HumanSilhouette.styled"
import { Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

export const HumanSilhouette = () => {
  return (
    <Wrapper direction='column'>
      <HumanModelSVG src={humanFrontBack} />
      <Title>Muscles hit past 7 days</Title>
    </Wrapper>
  )
}
