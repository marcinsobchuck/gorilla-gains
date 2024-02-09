export interface SetItemProps {
  exerciseIndex: number
  lastExerciseIndex: number
  setOfExerciseIndex: number
  lastSetIndex: number
  onRemoveSet: (index?: number | number[]) => void
}
