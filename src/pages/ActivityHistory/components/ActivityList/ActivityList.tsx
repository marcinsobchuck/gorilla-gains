import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { Activity } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
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

import { LoadMore, NoActivitiesWrapper, Wrapper } from "./ActivityList.styled"
import { useActivitiesInfiniteScroll } from "./hooks/useActivitiesInfiniteScroll"

export const ActivityList = () => {
  const [initialLoading, setInitialLoading] = useState(true)

  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const limit = state.limit
  const offset = state.activitiesData.length

  const observerTarget = useActivitiesInfiniteScroll(initialLoading, offset, limit)

  const handleRemoveActivity = async (id: string) => {
    await dispatch(deleteActivityAction(id))
    dispatch(removePreset(id))
  }

  const handleEditActivity = (activity: Activity) => {
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
            await dispatch(
              editActivityAction({ activityId: id, dataToEdit: { isPreset: false }, theme })
            )
          },
        }
      : {
          label: "Mark as preset",
          action: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation()
            await dispatch(
              editActivityAction({ activityId: id, dataToEdit: { isPreset: true }, theme })
            )
          },
        },
  ]

  useEffect(() => {
    if (state.activitiesData.length > 0) {
      setInitialLoading(false)
      return
    }
    const fetchActivities = async () => {
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset: 0,
          limit,
        })
      )
      setInitialLoading(false)
    }

    fetchActivities()
  }, [dispatch, limit, state.activitiesData.length])

  if (initialLoading && state.activitiesData.length < 0) {
    return (
      <Wrapper>
        <SkeletonTheme>
          <Skeleton style={{ marginBottom: "24px", borderRadius: "9px" }} height={120} count={3} />
        </SkeletonTheme>
      </Wrapper>
    )
  }

  if (state.activitiesData?.length === 0 && state.activitiesStatus !== RequestStatuses.LOADING) {
    return (
      <Wrapper>
        <NoActivitiesWrapper>
          <p>No activities yet.</p>
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
    <Wrapper>
      {state.activitiesData?.map((activity) => (
        <ActivityCard
          key={activity._id}
          data={activity}
          popoverOptions={getPopoverOptions(activity._id, activity.isPreset, activity)}
        />
      ))}

      {state.activitiesStatus === RequestStatuses.LOADING && (
        <SkeletonTheme>
          <Skeleton style={{ marginBottom: "24px", borderRadius: "9px" }} height={120} count={3} />
        </SkeletonTheme>
      )}

      <LoadMore>{state.hasMore ? "Scroll to see more..." : "There is no data left."}</LoadMore>
      <div ref={observerTarget} />
    </Wrapper>
  )
}
