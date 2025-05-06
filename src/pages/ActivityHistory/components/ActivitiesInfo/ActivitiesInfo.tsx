import React from "react"

import { Wrapper } from "./ActivitiesInfo.styled"
import { ActivitiesInfoProps } from "./ActivitiesInfo.types"
import { ActivitiesOverview } from "./components/ActivitiesOverview/ActivitiesOverview"
import { FiltersBar } from "./components/FiltersBar/FiltersBar"

export const ActivitiesInfo: React.FC<ActivitiesInfoProps> = ({ activeTab }) => {
  return (
    <Wrapper direction='column' $shouldDisplay={activeTab === "insights"}>
      <FiltersBar />
      <ActivitiesOverview />
    </Wrapper>
  )
}
