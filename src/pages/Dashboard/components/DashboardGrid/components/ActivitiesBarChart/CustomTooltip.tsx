import { TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { BarChartTooltipWrapper, MonthWrapper, ValueItem } from "./ActivitiesBarChart.styled"

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
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
