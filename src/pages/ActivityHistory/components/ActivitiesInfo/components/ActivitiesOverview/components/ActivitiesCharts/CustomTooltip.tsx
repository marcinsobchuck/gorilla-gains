import { format } from "date-fns"
import React from "react"
import { TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { useAppSelector } from "@app/hooks"

import { DateWrapper, TooltipWrapper, ValueDescriptor, ValueText, ValuesWrapper } from "./CustomTooltip.styled"
import { TooltipValue, getTooltipValue } from "./utils"

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  const activeChartCombination = useAppSelector((state) => state.activitiesOverview.activeChartCombination)
  if (active && payload && payload.length && payload[0].value) {
    const renderValue = (value: TooltipValue) => {
      if (typeof value !== "object") return value

      return Object.entries(value).map(([key, durationValue]) => {
        if (!durationValue.value) return null

        return (
          <React.Fragment key={key}>
            {durationValue.value}
            <span>{durationValue.unit}</span>
          </React.Fragment>
        )
      })
    }

    const renderPayloadValues = () =>
      payload.map((item, index) => {
        if (!item.value) return null
        const tooltipValue = getTooltipValue(item.value, activeChartCombination.yAxis)
        const isDuration = activeChartCombination.yAxis === "duration"

        return (
          <ValuesWrapper justify='space-between' align='center' key={index}>
            <ValueDescriptor>{item.dataKey}</ValueDescriptor>
            <ValueText>
              {renderValue(tooltipValue)}
              {!isDuration && <span>{item.unit}</span>}
            </ValueText>
          </ValuesWrapper>
        )
      })

    const formattedDate = format(payload[0].payload.date, "yyyy/MM/dd")

    return (
      <TooltipWrapper direction='column' justify='flex-end' gap={12}>
        <div>{renderPayloadValues()}</div>
        <DateWrapper justify='space-between'>
          <p>Date</p>
          <span>{formattedDate}</span>
        </DateWrapper>
      </TooltipWrapper>
    )
  }

  return null
}
