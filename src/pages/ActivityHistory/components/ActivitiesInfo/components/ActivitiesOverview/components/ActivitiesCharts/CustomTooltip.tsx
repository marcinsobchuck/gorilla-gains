import { format } from "date-fns"
import React from "react"
import { TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { useAppSelector } from "@app/hooks"

import { DateWrapper, TooltipWrapper, ValueText } from "./CustomTooltip.styled"
import { getTooltipValue } from "./utils"

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  const activeChartCombination = useAppSelector(
    (state) => state.activitiesOverview.activeChartCombination
  )
  if (active && payload && payload.length && payload[0].value) {
    const tooltipValue = getTooltipValue(payload[0].value, activeChartCombination.yAxis)
    const unit = activeChartCombination.yAxis !== "duration" && payload[0].unit

    const renderDurationValue = Object.values(
      tooltipValue as Record<string, { value: number; unit: string }>
    ).map((value, index) => {
      if (!value.value) return null

      return (
        <React.Fragment key={index}>
          {value.value}
          <span>{value.unit}</span>
        </React.Fragment>
      )
    })

    return (
      <TooltipWrapper direction='column' justify='flex-end'>
        <ValueText>
          {typeof tooltipValue === "object" ? renderDurationValue : tooltipValue}
          <span>{unit}</span>
        </ValueText>
        {payload[0].payload.load && activeChartCombination.yAxis !== "load" && (
          <ValueText>
            {payload[0].payload.load}
            <span>kg</span>
          </ValueText>
        )}

        <DateWrapper justify='space-between'>
          <p>Date</p>
          <span>{format(payload[0].payload.date, "yyyy/MM/dd")}</span>
        </DateWrapper>
      </TooltipWrapper>
    )
  }

  return null
}
