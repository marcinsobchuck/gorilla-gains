import { useEffect, useRef } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getExercisesAction } from "@features/exercises/exercisesActions"

export const useExercisesInfiniteScroll = (filterText: string) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.exercises.searchExercisesData)
  const activeActivityTypeFilter = useAppSelector(
    (state) => state.exercises.activeActivityTypeFilter
  )
  const hasMore = useAppSelector((state) => state.exercises.hasMore)
  const limit = useAppSelector((state) => state.exercises.limit)

  const dataStatus = useAppSelector((state) => state.exercises.searchExercisesDataStatus)
  const isLoading = dataStatus === RequestStatuses.LOADING

  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerRef = observerTarget.current

    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        await dispatch(
          getExercisesAction({
            activityType: activeActivityTypeFilter,
            filterText,
            limit,
            offset: data.length,
          })
        )
      }
    })

    if (observerRef) {
      observer.observe(observerRef)
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef)
      }
    }
  }, [activeActivityTypeFilter, data.length, dispatch, filterText, hasMore])

  return { observerTarget, hasMore, isLoading, data }
}
