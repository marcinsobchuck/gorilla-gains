import { MainContentWrapper } from "@layouts/RootLayout/RootLayout.styled"

import { ExerciseInfo } from "./components/ExerciseInfo/ExerciseInfo"
import { SearchExercises } from "./components/SearchExercises/SearchExercises"
import { StyledSidebar } from "./ExercisesCatalogue.styled"
export const ExercisesCatalogue = () => {
  return (
    <>
      <StyledSidebar>
        <SearchExercises />
      </StyledSidebar>
      <MainContentWrapper>
        <ExerciseInfo />
      </MainContentWrapper>
    </>
  )
}
