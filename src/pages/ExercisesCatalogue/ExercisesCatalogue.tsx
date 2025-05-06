import { useAppSelector } from "@app/hooks"
import { Breakpoints } from "@enums/breakpoints.enum"
import { useScrollLock } from "@hooks/useLockScroll"
import { useMediaQuery } from "@hooks/useMediaQuery"

import { ExerciseDetails } from "./components/ExerciseInfo/components/ExerciseDetails/ExerciseDetails"
import { ExerciseInfo } from "./components/ExerciseInfo/ExerciseInfo"
import { SearchExercises } from "./components/SearchExercises/SearchExercises"
import {
  MobileExerciseDetailsContainer,
  StyledMainContentWrapper,
  StyledSidebar,
} from "./ExercisesCatalogue.styled"

export const ExercisesCatalogue = () => {
  const isMedium = useMediaQuery(Breakpoints.MEDIUM)
  const activeExercise = useAppSelector((state) => state.exercises.activeExercise)

  useScrollLock({ autoLock: !!activeExercise && !isMedium })

  return (
    <>
      {!isMedium && activeExercise && (
        <MobileExerciseDetailsContainer>
          <ExerciseDetails />
        </MobileExerciseDetailsContainer>
      )}
      <StyledSidebar>
        <SearchExercises />
      </StyledSidebar>
      <StyledMainContentWrapper>
        <ExerciseInfo />
      </StyledMainContentWrapper>
    </>
  )
}
