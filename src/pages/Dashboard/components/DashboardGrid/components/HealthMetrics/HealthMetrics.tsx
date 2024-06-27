import { useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { Wrapper } from "./HealthMetrics.styled"
import { getHealthMetrics, getItems } from "./utils"
import { BasicCard } from "../BasicCard/BasicCard"

export const HealthMetrics = () => {
  const userInfo = useAppSelector((state) => state.user.data)
  const status = useAppSelector((state) => state.user.status)

  if (status === RequestStatuses.LOADING && !userInfo) {
    return <div>Loading...</div>
  }

  if (!userInfo) {
    return <div>No health metrics available.</div>
  }

  const { weight, height, age, gender, activityLevel } = userInfo

  const { BMI, BMR, TDEE, PAL } = getHealthMetrics(weight, height, age, gender, activityLevel)

  const items = getItems({ BMI, BMR, TDEE, PAL })

  return (
    <Wrapper justify='space-between'>
      {items.map((el, index) => (
        <BasicCard
          key={index}
          label={el.label}
          value={el.value}
          tooltipInfo={el.tooltipInfo}
          source={el.source}
        />
      ))}
    </Wrapper>
  )
}
