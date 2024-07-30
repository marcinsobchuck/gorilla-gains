import { format } from "date-fns"
import { useEffect } from "react"
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  DotProps,
  Label,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { setActiveActivity } from "@features/activities/activitiesSlice"
import { getActivitiesForActivityTypeAction } from "@features/activitiesOverview/activitiesOverviewActions"
import { setActiveFilterTab } from "@features/activitiesOverview/activitiesOverviewSlice"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { DateWrapper, TooltipWrapper, ValueText, Wrapper } from "./ActivitiesChart.styled"
import {
  YAxisTickFormatter,
  getExerciseUnit,
  getTooltipValue,
  transformActivitiesIntoChartData,
} from "./utils"

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  const activeChartCombination = useAppSelector(
    (state) => state.activitiesOverview.activeChartCombination
  )
  if (active && payload && payload.length) {
    const tooltipValue = getTooltipValue(payload[0].value, activeChartCombination.yAxis)
    const unit = activeChartCombination.yAxis !== "duration" && payload[0].unit

    return (
      <TooltipWrapper direction='column' justify='flex-end'>
        <ValueText>
          {typeof tooltipValue === "object" ? (
            <>
              {tooltipValue.days && (
                <>
                  {tooltipValue.days}
                  <span>d</span>
                </>
              )}
              {tooltipValue.hours && (
                <>
                  {tooltipValue.hours}
                  <span>h</span>
                </>
              )}
              {tooltipValue.minutes && (
                <>
                  {tooltipValue.minutes}
                  <span>m</span>
                </>
              )}
              {tooltipValue.seconds && (
                <>
                  {tooltipValue.seconds}
                  <span>s</span>
                </>
              )}
            </>
          ) : (
            tooltipValue
          )}
          <span>{unit}</span>
        </ValueText>
        <DateWrapper justify='space-between'>
          <p>Date</p>
          <span>{format(label, "yyyy/MM/dd")}</span>
        </DateWrapper>
      </TooltipWrapper>
    )
  }

  return null
}

export const ActivitiesCharts = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.activitiesOverview.activitiesStatus)
  const type = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  const activities = useAppSelector((state) => state.activitiesOverview.activities)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )
  const activeChartCombination = useAppSelector(
    (state) => state.activitiesOverview.activeChartCombination
  )
  const theme = useTheme()

  const data = transformActivitiesIntoChartData(
    activities,
    activeFilterExercise,
    activeChartCombination.yAxis
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeDotOnClick: Required<DotProps>["onClick"] = (_props, payload: any) => {
    dispatch(setActiveFilterTab("details"))
    const activity = activities.find((activity) => activity._id === payload.payload.activityId)
    if (activity) {
      dispatch(setActiveActivity(activity))
    }
  }

  useEffect(() => {
    const fetchActivities = async () =>
      await dispatch(
        getActivitiesForActivityTypeAction({
          type,
        })
      )
    if (type) {
      fetchActivities()
    }
  }, [dispatch, type])

  if (status === RequestStatuses.LOADING) {
    return (
      <Wrapper justify='center' align='center'>
        <LoaderSpinner height={120} width={120} />
      </Wrapper>
    )
  }

  if (activities?.length === 0) {
    return (
      <Wrapper justify='center' align='center'>
        No data
      </Wrapper>
    )
  }

  return (
    <Wrapper justify='center' align='center'>
      <ResponsiveContainer width='100%' height={330}>
        <AreaChart data={data} {...{ overflow: "visible" }}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={theme.secondary} stopOpacity={0.3} />
              <stop offset='95%' stopColor={theme.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={activeChartCombination.xAxis}
            tickFormatter={(value) => format(value, "dd/MM/yyyy")}
            height={50}
            tickMargin={9}
            interval='equidistantPreserveStart'
            fontSize={14}
            tickLine={false}
            axisLine={false}
          >
            <Label
              value={capitalizeFirstLetter(activeChartCombination.xAxis)}
              position='insideBottom'
              fontSize={14}
              stroke={theme.primaryDisabled}
              strokeWidth={0.3}
              opacity={0.5}
            />
          </XAxis>
          <YAxis
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => YAxisTickFormatter(value, activeChartCombination.yAxis)}
          >
            <Label
              value={`${capitalizeFirstLetter(activeChartCombination.yAxis)} (${getExerciseUnit(data, activeChartCombination.yAxis)})`}
              position='insideLeft'
              angle={-90}
              fontSize={14}
              stroke={theme.primaryDisabled}
              strokeWidth={0.3}
              opacity={0.5}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid vertical={false} strokeWidth={0.3} />
          <Area
            type='monotone'
            dataKey='value'
            stroke='#6EAF5E'
            strokeWidth={3}
            fillOpacity={1}
            fill='url(#colorUv)'
            unit={getExerciseUnit(data, activeChartCombination.yAxis)}
            dot
            activeDot={{
              r: 7,
              fill: theme.secondary,
              stroke: theme.secondaryActive,
              strokeWidth: 2,
              cursor: "pointer",
              onClick: activeDotOnClick,
            }}
          />
          {data.length > 19 && (
            <Brush
              dataKey='date'
              tickFormatter={(value) => format(value, "dd/MM/yyyy")}
              travellerWidth={12}
              stroke='#A1D890'
              fill='transparent'
              height={22}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
