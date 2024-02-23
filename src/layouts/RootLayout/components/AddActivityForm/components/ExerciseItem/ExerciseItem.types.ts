export interface ExerciseItemProps {
  exerciseIndex: number
  lastExerciseIndex: number
  activityTypeId?: string
  onRemoveExercise: (index?: number | number[]) => void
}
