export interface ExerciseItemProps {
  exerciseIndex: number
  lastExerciseIndex: number
  activityType?: string | string[]
  onRemoveExercise: (index?: number | number[]) => void
}
