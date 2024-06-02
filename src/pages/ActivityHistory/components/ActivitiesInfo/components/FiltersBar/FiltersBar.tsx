import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { FilterTabs } from "@features/activitiesOverview/activitiesOverview.types"
import { setActiveFilterTab } from "@features/activitiesOverview/activitiesOverviewSlice"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { capitalizeFirstLetter } from "@layouts/RootLayout/components/AddActivityForm/utils"

import { FilterTab, SkeletonWrapper, Wrapper } from "./FiltersBar.styled"

export const FiltersBar = () => {
  const activeTab = useAppSelector((state) => state.activitiesOverview.activeFilterTab)
  const activityTypes = useAppSelector((state) => state.activityTypes.data)
  const activityTypesStatus = useAppSelector((state) => state.activityTypes.status)
  const activityDetails = useAppSelector((state) => state.activities.activeActivity)

  const dispatch = useAppDispatch()
  const handleTabClick = (tab: FilterTabs) => dispatch(setActiveFilterTab(tab))

  useEffect(() => {
    if (activityTypes) return

    const fetchActivityTypes = async () => await dispatch(getActivityTypesAction())

    fetchActivityTypes()
  }, [activityTypes, dispatch])

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
          onClick={() => handleTabClick(tab.type)}
          $isActive={activeTab === tab.type}
        >
          <p>{capitalizeFirstLetter(tab.type)}</p>
        </FilterTab>
      ))}
    </Wrapper>
  )
}
