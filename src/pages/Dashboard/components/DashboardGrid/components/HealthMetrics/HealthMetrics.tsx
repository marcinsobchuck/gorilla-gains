import { differenceInYears, parseISO } from "date-fns"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { NoDataWrapper, Wrapper } from "./HealthMetrics.styled"
import { getHealthMetrics, getItems } from "./utils"
import { NoDataMessage } from "../../DashboardGrid.styled"
import { BasicCard } from "../BasicCard/BasicCard"

export const HealthMetrics = () => {
  const userInfo = useAppSelector((state) => state.user.data)
  const status = useAppSelector((state) => state.user.status)

  if (status === RequestStatuses.FAILED) {
    return (
      <NoDataWrapper justify='center' align='center'>
        <NoDataMessage>Failed to load the data</NoDataMessage>
      </NoDataWrapper>
    )
  }

  if (status === RequestStatuses.LOADING || !userInfo) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
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
