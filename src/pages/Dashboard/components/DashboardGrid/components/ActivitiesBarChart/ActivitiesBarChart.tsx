import Skeleton from "react-loading-skeleton"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import { Title, Wrapper } from "./ActivitiesBarChart.styled"
import { CustomTooltip } from "./CustomTooltip"
import { NoDataMessage } from "../../DashboardGrid.styled"

export const ActivitiesBarChart = () => {
  const theme = useTheme()

  const chartData = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesInYear
  )
  const chartDataStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)

  const activityTypes = [
    ...new Set(
      chartData?.flatMap((obj) =>
        Object.keys(obj).filter((key) => !["value", "name", "fullMonthName"].includes(key))
      )
    ),
  ]

  if (chartDataStatus === RequestStatuses.FAILED) {
    return (
      <Wrapper justify='center' align='center'>
        <NoDataMessage>Failed to load the data.</NoDataMessage>
      </Wrapper>
    )
  }

  if (chartDataStatus === RequestStatuses.LOADING) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  if (!chartData) {
    return (
      <Wrapper justify='center' align='center'>
        <NoDataMessage>No activities done.</NoDataMessage>
      </Wrapper>
    )
  }

  return (
    <Wrapper direction='column' justify='flex-end'>
      <Title>Activities per month</Title>
      <ResponsiveContainer height='100%'>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeWidth={0.1} />
          <XAxis dataKey='name' interval={0} fontSize={12} />
          <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
          <Tooltip
            cursor={{
              fill: theme.secondaryOpacity,
            }}
            content={CustomTooltip}
          />
          {activityTypes.map((activityType) => {
            const unresolved = activityType === "unresolved"
            return (
              <Bar
                key={activityType}
                dataKey={activityType}
                fill={
                  unresolved
                    ? theme.plannedColor
                    : getDataForActivityType(activityType as ActivityTypes, theme).primaryColor
                }
                barSize='100%'
              />
            )
          })}
          <Legend
            align='left'
            iconSize={8}
            iconType='circle'
            wrapperStyle={{
              fontSize: 12,
              left: 40,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
