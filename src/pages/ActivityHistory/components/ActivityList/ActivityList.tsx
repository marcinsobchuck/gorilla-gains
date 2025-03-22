import { format, parseISO } from "date-fns"
import { useEffect, useRef } from "react"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  deleteActivityAction,
  getActivitiesForCurrentUserAction,
} from "@features/activities/activitiesActions"
import {
  setActiveActivity,
  setCurrentlyEditedActivity,
  setIsActivityDetailsOpen,
  setIsAddEditModalOpen,
  setIsEditing,
  setShouldFetchActivities,
} from "@features/activities/activitiesSlice"
import { createActivityPresetAction } from "@features/activityPresets/activityPresetsActions"
import { ActivityCard } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard"

import { LoadMore, NoActivitiesWrapper, Wrapper } from "./ActivityList.styled"
import { useActivitiesInfiniteScroll } from "./hooks/useActivitiesInfiniteScroll"
import { getCreateActivityPresetData } from "./utils"

export const ActivityList = () => {
  const state = useAppSelector((state) => state.activities)
  const shouldFetchActivities = state.shouldFetchActivities
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const activities = state.activitiesData

  const limit = state.limit
  const offset = state.activitiesData.length

  const observerTarget = useActivitiesInfiniteScroll(offset, limit)

  const handleEditActivity = (activity: Activity) => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activity))
  }

  const getPopoverOptions = (id: string, activity: Activity) => [
    {
      label: "Delete activity",
      action: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        await dispatch(deleteActivityAction(id))
      },
    },
    {
      label: "Edit activity",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleEditActivity(activity)
      },
    },
    {
      label: "Make preset from",
      action: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        await dispatch(createActivityPresetAction(getCreateActivityPresetData(activity)))
      },
    },
  ]

  useEffect(() => {
    const fetchActivities = async () => {
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset: 0,
          limit,
          pastOnly: true,
        })
      )
      dispatch(setShouldFetchActivities(false))
    }

    shouldFetchActivities && fetchActivities()
  }, [dispatch, limit, shouldFetchActivities])

  useEffect(() => {
    if (ref.current && state.activitiesData.length < state.limit) {
      ref.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [state.activitiesData.length, state.limit])

  if (
    activities.length === 0 &&
    state.activitiesStatus !== RequestStatuses.LOADING &&
    !shouldFetchActivities
  ) {
    return (
      <Wrapper>
        <NoActivitiesWrapper>
          <p>
            {state.selectedDate
              ? `No activities on ${format(parseISO(state.selectedDate), "LLL do, y")}`
              : "No activities yet."}
          </p>
          <p>Try adding some and you will see them here.</p>
          <Button
            buttonType='button'
            variant='tertiary'
            icon='add'
            textColor={theme.secondary}
            iconColor={theme.secondary}
            onClick={() => dispatch(setIsAddEditModalOpen(true))}
          >
            Add activity
          </Button>
        </NoActivitiesWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper ref={ref}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity._id}
          data={activity}
          popoverOptions={getPopoverOptions(activity._id, activity)}
          onClick={() => {
            dispatch(setIsActivityDetailsOpen(true))
            dispatch(setActiveActivity({ activityId: activity._id, activities }))
          }}
        />
      ))}

      {state.activitiesStatus === RequestStatuses.LOADING && (
        <SkeletonTheme>
          <Skeleton style={{ marginBottom: "24px", borderRadius: "9px" }} height={120} count={3} />
        </SkeletonTheme>
      )}

      <LoadMore>{state.hasMore ? "Scroll to see more..." : "There is no data left."}</LoadMore>
      {!state.selectedDate && <div ref={observerTarget} />}
    </Wrapper>
  )
}
