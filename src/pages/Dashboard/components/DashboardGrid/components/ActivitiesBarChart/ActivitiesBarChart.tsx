import Skeleton from "react-loading-skeleton"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { Title, Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

export const ActivitiesBarChart = () => {
  const chartData = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesInYear
  )
  const chartDataStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)

  const theme = useTheme()

  if (chartDataStatus === RequestStatuses.LOADING || !chartData) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  return (
    <Wrapper direction='column' justify='flex-end'>
      <Title>Activities per month</Title>
      <ResponsiveContainer height='90%'>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeWidth={0.3} />
          <XAxis dataKey='name' interval={0} fontSize={12} />
          <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
          <Tooltip />
          <Bar dataKey='value' fill={theme.secondary} barSize={20} radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
