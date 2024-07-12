import Skeleton from "react-loading-skeleton"
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "styled-components"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { capitalizeFirstLetter } from "@layouts/RootLayout/components/AddActivityForm/utils"

import { Title, Wrapper } from "./ActivitiesPieChart.styled"
import { getPieChartColor } from "./utils"

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name,
}: PieLabelRenderProps) => {
  const innerRadiusNum = typeof innerRadius === "number" ? innerRadius : parseFloat(innerRadius)
  const outerRadiusNum = typeof outerRadius === "number" ? outerRadius : parseFloat(outerRadius)
  const cxNum = typeof cx === "number" ? cx : parseFloat(cx)
  const cyNum = typeof cy === "number" ? cy : parseFloat(cy)

  const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 1.1
  const x = cxNum + radius * Math.cos(-midAngle * RADIAN)
  const y = cyNum + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cxNum ? "start" : "end"}
      dominantBaseline='central'
      fontSize={12}
    >
      {`${capitalizeFirstLetter(name)} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const ActivitiesPieChart = () => {
  const chartData = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activityTypeDistribution
  )
  const chartDataStatus = useAppSelector((state) => state.activitiesSummary.activitiesSummaryStatus)
  const theme = useTheme()
  const colors = {
    endurance: theme.enduranceEventColor,
    strength: theme.strengthEventColor,
    flexibility: theme.flexibilityEventColor,
    balance: theme.balanceEventColor,
  }

  if (chartDataStatus === RequestStatuses.LOADING || !chartData) {
    return (
      <SkeletonTheme>
        <Skeleton height='100%' />
      </SkeletonTheme>
    )
  }

  return (
    <Wrapper direction='column' justify='flex-end'>
      <Title>Activities % overall</Title>
      <ResponsiveContainer height='90%'>
        <PieChart>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={90}
            strokeWidth={0.2}
            strokeOpacity={1}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={getPieChartColor(entry.name, colors)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
