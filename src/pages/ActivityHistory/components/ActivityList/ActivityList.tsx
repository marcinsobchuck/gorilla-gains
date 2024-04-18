import { useEffect, useRef } from "react"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  deleteActivityAction,
  editActivityAction,
  getActivitiesForCurrentUserAction,
} from "@features/activities/activitiesActions"
import {
  removePreset,
  setCurrentlyEditedActivity,
  setIsAddEditModalOpen,
  setIsEditing,
} from "@features/activities/activitiesSlice"
import { ActivityCard } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard"

import { LoadMore, Wrapper } from "./ActivityList.styled"

export const ActivityList = () => {
  const observerTarget = useRef(null)

  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  const limit = 6
  const offset = (state.activitiesPage - 1) * limit

  const handleRemoveActivity = async (id: string) => {
    await dispatch(deleteActivityAction(id))
    dispatch(removePreset(id))
  }

  const handleEditActivity = async (activity: Activity) => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activity))
  }

  const getPopoverOptions = (id: string, isPreset: boolean, activity: Activity) => [
    {
      label: "Delete activity",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleRemoveActivity(id)
      },
    },
    {
      label: "Edit activity",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleEditActivity(activity)
      },
    },
    isPreset
      ? {
          label: "Delete from presets",
          action: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation()
            await dispatch(editActivityAction({ activityId: id, dataToEdit: { isPreset: false } }))
          },
        }
      : {
          label: "Mark as preset",
          action: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation()
            await dispatch(editActivityAction({ activityId: id, dataToEdit: { isPreset: true } }))
          },
        },
  ]

  useEffect(() => {
    const fetchActivities = async () => {
      if (state.activitiesData) return
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset: 0,
          limit,
        })
      )
    }
    fetchActivities()
  }, [dispatch, state.activitiesData])

  useEffect(() => {
    const observerCurrent = observerTarget.current

    const fetchActivities = async () => {
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset,
          limit,
        })
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          state.activitiesData &&
          state.activitiesData.length >= limit &&
          state.hasMore
        ) {
          fetchActivities()
        }
      },
      {
        threshold: 1,
      }
    )

    if (observerCurrent) {
      observer.observe(observerCurrent)
    }

    return () => {
      if (observerCurrent) {
        observer.unobserve(observerCurrent)
      }
    }
  }, [
    dispatch,
    observerTarget,
    offset,
    state.activitiesData,
    state.activitiesData?.length,
    state.hasMore,
  ])

  if (state.activitiesData?.length === 0) {
    return <div>No activities yet</div>
  }

  return (
    <Wrapper>
      {state.activitiesData?.map((activity) => (
        <ActivityCard
          key={activity._id}
          data={activity}
          popoverOptions={getPopoverOptions(activity._id, activity.isPreset, activity)}
        />
      ))}

      <LoadMore>
        {state.activitiesStatus === RequestStatuses.LOADING
          ? "Loading..."
          : state.hasMore
            ? "Scroll to see more..."
            : "There is no data left."}
      </LoadMore>
      <div ref={observerTarget} />
    </Wrapper>
  )
}
