import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  setActiveChartCombination,
  setActiveFilterTab,
} from "@features/activitiesOverview/activitiesOverviewSlice"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { FilterTab, SkeletonWrapper, StyledSelect, Wrapper } from "./FiltersBar.styled"
import {
  getAvailableChartMetrics,
  getAvailableChartOptions,
} from "../ActivitiesOverview/components/ActivitiesCharts/utils"

export const FiltersBar = () => {
  const activeTab = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  const activityTypes = useAppSelector((state) => state.activityTypes.data)
  const activityTypesStatus = useAppSelector((state) => state.activityTypes.status)
  const activityDetails = useAppSelector((state) => state.activities.activeActivity)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )
  const activeFilterTab = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  const activities = useAppSelector((state) => state.activitiesOverview.activities)
  const activeChartCombination = useAppSelector(
    (state) => state.activitiesOverview.activeChartCombination
  )

  const dispatch = useAppDispatch()
  const handleTabClick = (tab: string) => dispatch(setActiveFilterTab(tab))

  useEffect(() => {
    if (activityTypes) return

    const fetchActivityTypes = async () => await dispatch(getActivityTypesAction())

    fetchActivityTypes()
  }, [activityTypes, dispatch])

  useEffect(() => {
    if (activeFilterExercise && activities.length > 0) {
      const options = getAvailableChartOptions(
        getAvailableChartMetrics(activities, activeFilterExercise)
      )
      dispatch(
        setActiveChartCombination({
          xAxis: "date",
          yAxis: options[0].value,
        })
      )
    }
  }, [activeFilterExercise, activities, dispatch])

  if (activityTypesStatus === RequestStatuses.LOADING) {
    return (
      <Wrapper>
        <SkeletonTheme>
          <SkeletonWrapper>
            <Skeleton height='100%' inline />
          </SkeletonWrapper>
        </SkeletonTheme>
      </Wrapper>
    )
  }

  if (activityTypesStatus === RequestStatuses.FAILED) {
    return (
      <Wrapper>
        <p>There was an error</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {activityDetails && (
        <FilterTab
          onClick={() => handleTabClick("details")}
          $isActive={activeTab === "details"}
          justify='center'
          align='center'
        >
          <p>{capitalizeFirstLetter("details")}</p>
        </FilterTab>
      )}
      {activityTypes?.map((tab) => (
        <FilterTab
          key={tab._id}
          justify='center'
          align='center'
          onClick={() => handleTabClick(tab._id)}
          $isActive={activeTab === tab._id}
        >
          <p>{capitalizeFirstLetter(tab.type)}</p>
        </FilterTab>
      ))}
      {activities.length > 0 && activeFilterTab !== "details" && (
        <StyledSelect
          name='availableCharts'
          labelText='Chart options'
          isSearchable={false}
          onChange={(selectedOption) =>
            dispatch(
              setActiveChartCombination({
                xAxis: "date",
                yAxis: selectedOption,
              })
            )
          }
          value={{
            value: activeChartCombination.yAxis,
            label: activeChartCombination.yAxis
              ? `${activeChartCombination.yAxis}/${activeChartCombination.xAxis}`
              : "",
          }}
          options={getAvailableChartOptions(
            getAvailableChartMetrics(activities, activeFilterExercise)
          )}
        />
      )}
    </Wrapper>
  )
}
