import Skeleton from "react-loading-skeleton"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import { BarChartTooltipWrapper, MonthWrapper, ValueItem } from "./ActivitiesBarChart.styled"
import { Title, Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <BarChartTooltipWrapper direction='column'>
        <FlexContainer direction='column' gap={6}>
          {payload.map((item) => (
            <ValueItem key={item.dataKey} justify='space-between' align='center'>
              <p>{item.name}</p>
              <span>{item.value}</span>
            </ValueItem>
          ))}
          <ValueItem justify='space-between' align='center'>
            <p>Total done</p>
            <span>{payload[0].payload.value}</span>
          </ValueItem>
        </FlexContainer>
        <MonthWrapper justify='center' align='center'>
          {payload[0].payload.fullMonthName}
        </MonthWrapper>
      </BarChartTooltipWrapper>
    )
  }

  return null
}

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
          <CartesianGrid vertical={false} strokeWidth={0.1} />
          <XAxis dataKey='name' interval={0} fontSize={12} />
          <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
          <Tooltip
            cursor={{
              fill: theme.secondaryOpacity,
            }}
            content={<CustomTooltip />}
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
