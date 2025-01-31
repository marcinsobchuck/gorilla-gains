import uniqBy from "lodash.uniqby"
import { useEffect } from "react"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { Icon } from "@components/Icon/Icon"
import { getFavouriteExercisesAction } from "@features/exercises/exercisesActions"
import { setActiveExercise } from "@features/exercises/exercisesSlice"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  ExerciseListItem,
  ExerciseListWrapper,
  LoadMore,
  StyledLoaderSpinner,
} from "./ExercisesList.styled"
import { ExercisesListProps } from "./ExercisesList.types"
import { useExercisesInfiniteScroll } from "./hooks/useExercisesInfiniteScroll"

export const ExercisesList: React.FC<ExercisesListProps> = ({ filterText }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const favouriteExercises = useAppSelector((state) => state.exercises.favouriteExercises)
  const activeActivityTypeFilter = useAppSelector(
    (state) => state.exercises.activeActivityTypeFilter
  )
  const shouldFetchFavouriteExercises = useAppSelector(
    (state) => state.exercises.shouldFetchFavouriteExercises
  )
  const { data, hasMore, observerTarget, isLoading } = useExercisesInfiniteScroll(filterText)

  const exercises = uniqBy([...favouriteExercises, ...data], (ex) => ex._id).filter((ex) => {
    const matchesActivityType =
      activeActivityTypeFilter.length === 0 ||
      activeActivityTypeFilter.includes(ex.activityType._id)
    const matchesTextFilter =
      filterText.trim().length === 0 || ex.name.toLowerCase().includes(filterText.toLowerCase())

    return matchesActivityType && matchesTextFilter
  })

  useEffect(() => {
    const fetchFavouriteExercises = async () => {
      if (!shouldFetchFavouriteExercises) return

      await dispatch(getFavouriteExercisesAction())
    }

    fetchFavouriteExercises()
  }, [dispatch, shouldFetchFavouriteExercises])

  return (
    <>
      <ExerciseListWrapper>
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={index}
            $gradient={getDataForActivityType(exercise.activityType.type, theme).cardGradient}
            align='center'
            justify='space-between'
            onClick={() => dispatch(setActiveExercise(exercise))}
          >
            <ActivityTypeBadge
              activityType={exercise.activityType.type}
              title={exercise.name}
              iconPadding={12}
              gap={9}
            />
            {exercise.isFavourite && <Icon name='star' color='gold' />}
          </ExerciseListItem>
        ))}

        {!isLoading && <div ref={observerTarget} id='xpp' />}
      </ExerciseListWrapper>

      <LoadMore justify='space-around'>
        {isLoading && <StyledLoaderSpinner />}
        {hasMore ? "Scroll to load more..." : "No more data."}
      </LoadMore>
    </>
  )
}
