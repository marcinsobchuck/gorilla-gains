import { useEffect, useRef } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivitiesForCurrentUserAction } from "@features/activities/activitiesActions"
import { ActivityCard } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard"

import { LoadMore, Wrapper } from "./ActivityList.styled"

export const ActivityList = () => {
  const observerTarget = useRef(null)

  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  const limit = 12
  const offset = (state.activitiesPage - 1) * limit

  useEffect(() => {
    const fetchActivities = async () => {
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset: 0,
          limit,
        })
      )
    }
    fetchActivities()
  }, [dispatch])

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
      {state.activitiesData?.map((activity) => <ActivityCard key={activity._id} data={activity} />)}

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
// hasMore = response.length < limit
