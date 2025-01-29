import debounce from "lodash.debounce"
import { ChangeEvent, useCallback, useEffect } from "react"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Icon } from "@components/Icon/Icon"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { getExercisesAction } from "@features/exercises/exercisesActions"
import {
  resetSearchExercisesData,
  setSearchExercisesInputValue,
  toggleAddRemoveActivityTypeFilter,
} from "@features/exercises/exercisesSlice"
import { getDataForActivityType } from "@utils/getDataForActivityType"

import {
  FilterTile,
  FilterTilesWrapper,
  SearchBarWrapper,
  SearchInput,
  SearchLabel,
  StyledIcon,
  Title,
} from "./SearchBar.styled"
import { SearchBarProps } from "./SearchBar.types"

export const SearchBar: React.FC<SearchBarProps> = ({ filterText, setFilterText }) => {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const searchExerciseInputValue = useAppSelector(
    (state) => state.exercises.searchExercisesInputValue
  )
  const activeActivityTypeFilter = useAppSelector(
    (state) => state.exercises.activeActivityTypeFilter
  )

  const limit = useAppSelector((state) => state.exercises.limit)
  const activityTypes = useAppSelector((state) => state.activityTypes.data)
  const dataStatus = useAppSelector((state) => state.exercises.searchExercisesDataStatus)
  const isLoading = dataStatus === RequestStatuses.LOADING

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterText = useCallback(
    debounce((filterText: string) => {
      setFilterText(filterText)
    }, 300),
    [dispatch]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchExercisesInputValue(e.currentTarget.value))
    debouncedFilterText(e.currentTarget.value)
  }

  useEffect(() => {
    if (!activityTypes) {
      const fetchActivityTypes = async () => await dispatch(getActivityTypesAction())
      fetchActivityTypes()
    }
  }, [activityTypes, dispatch])

  useEffect(() => {
    const fetchExercises = async () => {
      dispatch(resetSearchExercisesData())

      await dispatch(
        getExercisesAction({
          activityType: activeActivityTypeFilter,
          filterText,
          limit,
        })
      )
    }

    fetchExercises()
  }, [activeActivityTypeFilter, dispatch, filterText, limit])

  return (
    <SearchBarWrapper>
      <Title>Active filters</Title>
      <FilterTilesWrapper gap={12}>
        {activityTypes?.map((activityType) => (
          <FilterTile
            key={activityType._id}
            $color={getDataForActivityType(activityType.type, theme).primaryColorOpacity}
            $isActive={activeActivityTypeFilter.includes(activityType._id)}
            onClick={() => dispatch(toggleAddRemoveActivityTypeFilter(activityType._id))}
            disabled={isLoading}
          >
            <Icon
              name={getDataForActivityType(activityType.type).iconName}
              color={getDataForActivityType(activityType.type, theme).primaryColor}
              height={18}
              width={18}
              isInteractive
            />
          </FilterTile>
        ))}
      </FilterTilesWrapper>
      <SearchLabel htmlFor='search-exercise'>
        <StyledIcon name='search' />
        <SearchInput
          id='search-exercise'
          type='text'
          placeholder='Search exercise'
          value={searchExerciseInputValue}
          onChange={handleChange}
        />
      </SearchLabel>
    </SearchBarWrapper>
  )
}
