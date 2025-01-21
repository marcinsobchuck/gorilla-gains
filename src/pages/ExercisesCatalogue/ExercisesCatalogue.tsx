import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ExerciseInfo } from "./components/ExerciseInfo/ExerciseInfo"
import { SearchExercises } from "./components/SearchExercises/SearchExercises"
export const ExercisesCatalogue = () => {
  return (
    <>
      <Sidebar $padding='0px'>
        <SearchExercises />
      </Sidebar>
      <MainContentWrapper>
        {/* <iframe
          style={{ aspectRatio: "16 / 9", width: "50%", border: "none" }}
          src='https://www.youtube.com/embed/XfnPB9NMw7M?'
          title='xdd'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe> */}
        <ExerciseInfo />
      </MainContentWrapper>
    </>
  )
}
