import { useState } from "react"

import { useAppSelector } from "@app/hooks"

import { ExercisesList } from "./components/ExercisesList/ExercisesList"
import { SearchBar } from "./components/SearchBar/SearchBar"

export const SearchExercises = () => {
  const searchExerciseInputValue = useAppSelector(
    (state) => state.exercises.searchExercisesInputValue
  )
  const [filterText, setFilterText] = useState(searchExerciseInputValue || "")

  return (
    <>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      <ExercisesList filterText={filterText} />
    </>
  )
}
