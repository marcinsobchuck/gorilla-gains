import { useEffect, useRef } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivitiesForCurrentUserAction } from "@features/activities/activitiesActions"

export const useActivitiesInfiniteScroll = (offset: number, limit: number) => {
  const observerTarget = useRef(null)
  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const observerCurrent = observerTarget.current

    const fetchActivities = async () => {
      await dispatch(
        getActivitiesForCurrentUserAction({
          offset,
          limit,
          pastOnly: true,
        })
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          state.hasMore &&
          state.activitiesStatus !== RequestStatuses.LOADING
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
    limit,
    observerTarget,
    offset,
    state.activitiesData.length,
    state.activitiesStatus,
    state.hasMore,
  ])

  return observerTarget
}
