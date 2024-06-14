import { useAppDispatch, useAppSelector } from "@app/hooks"
import { setActiveFilterExercise } from "@features/activitiesOverview/activitiesOverviewSlice"

import { StyledRadioButtonGroup, Wrapper } from "./ChartFilters.styled"

export const ChartFilters = () => {
  const dispatch = useAppDispatch()
  const activities = useAppSelector((state) => state.activitiesOverview.activities)
  const activeFilterExercise = useAppSelector(
    (state) => state.activitiesOverview.activeFilterExercise
  )

  const exercises = activities.flatMap((activity) =>
    activity.exercises.map((exercise) => {
      return {
        value: exercise.exercise._id,
        labelText: exercise.exercise.name,
        checked: exercise.exercise._id === activeFilterExercise,
      }
    })
  )

  const exercisesNames = exercises.map((exercise) => exercise.labelText)
  const filteredExercises = exercises
    .filter((exercise, index) => {
      return !exercisesNames.includes(exercise.labelText, index + 1)
    })
    .reverse()

  return (
    <Wrapper>
      {activities.length > 0 && (
        <StyledRadioButtonGroup
          items={filteredExercises}
          groupTitle='filters'
          name='filters'
          align='flex-start'
          justify='flex-start'
          direction='column'
          gap={14}
          onChange={(e) => dispatch(setActiveFilterExercise(e.currentTarget.value))}
        />
      )}
    </Wrapper>
  )
}
