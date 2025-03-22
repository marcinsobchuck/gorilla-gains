import { format } from "date-fns"
import { useEffect } from "react"
import {
  Area,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  DotProps,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { setActiveActivity, setIsActivityDetailsOpen } from "@features/activities/activitiesSlice"
import { getActivitiesForActivityTypeAction } from "@features/activitiesOverview/activitiesOverviewActions"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { Wrapper } from "./ActivitiesChart.styled"
import { CustomTooltip } from "./CustomTooltip"
import { YAxisTickFormatter, getExerciseUnit, transformActivitiesIntoChartData } from "./utils"

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
    const activity = activities.find((activity) => activity._id === payload.payload.activityId)
    if (activity) {
      dispatch(setIsActivityDetailsOpen(true))
      dispatch(setActiveActivity({ activities, activityId: activity._id }))
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

  const shouldDisplayLoadBar =
    data.some((item) => item.load) && activeChartCombination.yAxis !== "load"

  return (
    <Wrapper justify='center' align='center'>
      <ResponsiveContainer width='100%' height='90%'>
        <ComposedChart data={data} {...{ overflow: "visible" }}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={theme.secondary} stopOpacity={0.3} />
              <stop offset='95%' stopColor={theme.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeWidth={0.3} />
          <XAxis
            dataKey={activeChartCombination.xAxis}
            tickFormatter={(value) => format(value, "dd/MM/yyyy")}
            height={50}
            tickMargin={9}
            interval='equidistantPreserveStart'
            fontSize={14}
            tickLine={false}
            axisLine={false}
            allowDuplicatedCategory={false}
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
            yAxisId={1}
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
          <YAxis yAxisId={2} orientation='right' fontSize={14} tickLine={false} axisLine={false}>
            <Label
              value='Load'
              angle={-90}
              dx={12}
              fontSize={14}
              stroke={theme.primaryDisabled}
              strokeWidth={0.3}
              opacity={0.5}
            />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          <Legend verticalAlign='top' height={32} iconSize={12} wrapperStyle={{ fontSize: 14 }} />

          {data.length > 30 && (
            <Brush
              dataKey='date'
              tickFormatter={(value) => format(value, "dd/MM/yyyy")}
              travellerWidth={14}
              stroke={theme.secondaryText}
              fill='transparent'
              height={12}
              fillOpacity={0.1}
            />
          )}

          {shouldDisplayLoadBar && (
            <Bar
              dataKey='load'
              yAxisId={2}
              barSize={30}
              fill={theme.strengthColor}
              fillOpacity={0.5}
            />
          )}

          <Area
            yAxisId={1}
            type='monotone'
            dataKey={activeChartCombination.yAxis}
            stroke='#6EAF5E'
            strokeWidth={3}
            fillOpacity={1}
            fill='url(#colorUv)'
            unit={getExerciseUnit(data, activeChartCombination.yAxis)}
            dot={data.length < 30}
            activeDot={{
              r: 7,
              fill: theme.secondary,
              stroke: theme.secondaryActive,
              strokeWidth: 2,
              cursor: "pointer",
              onClick: activeDotOnClick,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
