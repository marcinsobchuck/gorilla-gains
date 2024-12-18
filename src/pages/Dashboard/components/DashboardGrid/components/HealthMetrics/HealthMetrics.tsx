import { differenceInYears, parseISO } from "date-fns"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { Wrapper } from "./HealthMetrics.styled"
import { getHealthMetrics, getItems } from "./utils"
import { BasicCard } from "../BasicCard/BasicCard"

export const HealthMetrics = () => {
  const userInfo = useAppSelector((state) => state.user.data)
  const status = useAppSelector((state) => state.user.status)

  if (!userInfo || status === RequestStatuses.LOADING) {
    return (
      <Wrapper>
        <SkeletonTheme>
          <Skeleton containerClassName='skeletonWrapper' height='100%' />
        </SkeletonTheme>
      </Wrapper>
    )
  }
  const { weight, height, dob, gender, activityLevel } = userInfo

  const age = differenceInYears(new Date(), parseISO(dob))

  const { BMI, BMR, TDEE, PAL } = getHealthMetrics(weight, height, age, gender, +activityLevel)

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
