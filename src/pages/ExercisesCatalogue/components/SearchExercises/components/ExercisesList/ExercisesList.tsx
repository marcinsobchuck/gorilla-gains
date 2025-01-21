import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
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
  const limit = useAppSelector((state) => state.exercises.limit)
  const { data, hasMore, observerTarget, isLoading } = useExercisesInfiniteScroll(filterText)

  return (
    <>
      <ExerciseListWrapper>
        {data.map((exercise, index) => (
          <ExerciseListItem
            key={index}
            $gradient={getDataForActivityType(exercise.activityType.type, theme).cardGradient}
            align='center'
            onClick={() => dispatch(setActiveExercise(exercise))}
          >
            <ActivityTypeBadge
              activityType={exercise.activityType.type}
              title={exercise.name}
              iconPadding={12}
              gap={9}
            />
          </ExerciseListItem>
        ))}
        {isLoading && (
          <SkeletonTheme>
            {Array(9)
              .fill("")
              .map((_, index) => (
                <ExerciseListItem key={index} align='center' gap={9}>
                  <Skeleton width={46} height={46} />
                  <Skeleton width={160} height={20} inline={false} />
                </ExerciseListItem>
              ))}
          </SkeletonTheme>
        )}
        {!isLoading && data.length < limit && <div ref={observerTarget} />}
      </ExerciseListWrapper>

      <LoadMore justify='space-around'>
        {isLoading && <StyledLoaderSpinner />}
        {hasMore ? "Scroll to load more..." : "No more data."}
      </LoadMore>
    </>
  )
}
