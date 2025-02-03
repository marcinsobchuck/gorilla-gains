import { useAppSelector } from "@app/hooks"

import { ExerciseDetails } from "./components/ExerciseDetails/ExerciseDetails"
import { FourActivityTypesInfo } from "./components/FourActivityTypesInfo/FourActivityTypesInfo"
import { ExerciseInfoWrapper } from "./ExerciseInfo.styled"

export const ExerciseInfo = () => {
  const activeExercise = useAppSelector((state) => state.exercises.activeExercise)

  return (
    <ExerciseInfoWrapper>
      {activeExercise ? <ExerciseDetails /> : <FourActivityTypesInfo />}
    </ExerciseInfoWrapper>
  )
}
