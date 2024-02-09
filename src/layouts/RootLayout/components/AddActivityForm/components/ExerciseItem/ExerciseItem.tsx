import debounce from "lodash.debounce"
import { useCallback, useRef } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { getExercisesByActivityType } from "@api/exercisesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { Icon } from "@components/Icon/Icon"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getExercisesByActivityTypeAction } from "@features/exercises/exercisesActions"

import { ExerciseItemProps } from "./ExerciseItem.types"
import {
  AddSetButton,
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  SetsText,
  StyledSelect,
} from "../../AddActivityForm.styled"
import { AddActivityFormValues, ExerciseFields } from "../../AddActivityForm.types"
import {
  enduranceExerciseFields,
  staticExerciseFields,
  strengthExerciseFields,
} from "../../constants"
import { transformExerciseIntoOption } from "../../utils"
import { SetItem } from "../SetItem/SetItem"

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exerciseIndex,
  activityTypeId,
  lastExerciseIndex,
  onRemoveExercise,
}) => {
  const { watch, setValue } = useFormContext<AddActivityFormValues>()

  const {
    append: addSet,
    remove: removeSet,
    fields,
  } = useFieldArray({
    name: `exercises.${exerciseIndex}.sets`,
  })

  const currentActivityTypeCategory = watch("activityType").category
  const currentExercise = watch(`exercises.${exerciseIndex}.exercise.value`)
  const currentExercises = watch("exercises")
  const isExerciseStatic = watch(`exercises.${exerciseIndex}.exercise.isStatic`)

  const getSetsFormFields = (category: string, isExerciseStatic?: boolean) => {
    switch (category) {
      case "strength":
        return isExerciseStatic ? staticExerciseFields : strengthExerciseFields
      case "endurance":
        return enduranceExerciseFields
      default:
        return {}
    }
  }

  const ref = useRef<HTMLButtonElement>(null)

  const handleAddSetField = () => {
    addSet(getSetsFormFields(currentActivityTypeCategory, isExerciseStatic), { shouldFocus: false })
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const lastSetIndex = fields.length - 1

  const exercises = useAppSelector((state) => state.exercises)
  const dispatch = useAppDispatch()

  const exercisesNames = currentExercises?.map((exercise) => exercise.exercise.label)

  const getExercisesOptions = async (inputValue: string) => {
    try {
      const response = await getExercisesByActivityType({
        activityTypeId: watch("activityType").value,
        filterText: inputValue,
      })
      const exercises = response.data

      return transformExerciseIntoOption(exercisesNames, exercises)
    } catch (err) {
      console.log(err)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedExercises = useCallback(
    debounce((inputValue, callback) => {
      getExercisesOptions(inputValue).then((options) => callback(options))
    }, 500),
    []
  )

  return (
    <ExerciseWrapper>
      <ExerciseHeader>
        <ExerciseIndex>Exercise {exerciseIndex + 1}</ExerciseIndex>
        <Icon name='close' onClick={() => onRemoveExercise(exerciseIndex)} />
      </ExerciseHeader>
      <StyledSelect
        defaultOptions={
          exercises.status !== RequestStatuses.LOADING &&
          transformExerciseIntoOption(exercisesNames, exercises.data)
        }
        isLoading={exercises.status === RequestStatuses.LOADING}
        loadOptions={debouncedExercises}
        onFocus={async () => {
          await dispatch(
            getExercisesByActivityTypeAction({
              activityTypeId,
            })
          )
        }}
        onChange={(newValue) => {
          removeSet()
          handleAddSetField()
          setValue(`exercises.${exerciseIndex}.exercise`, newValue as ExerciseFields)
        }}
        name={`exercises.${exerciseIndex}.exercise`}
        labelText='Exercise'
      />
      {Boolean(currentExercise) && (
        <>
          <Checkbox label='Add breaks' name={`exercises.${exerciseIndex}.withBreaks`} />
          <SetsText>Sets</SetsText>
        </>
      )}
      {fields.map((set, setOfExerciseIndex) => {
        return (
          <SetItem
            key={set.id}
            exerciseIndex={exerciseIndex}
            lastExerciseIndex={lastExerciseIndex}
            setOfExerciseIndex={setOfExerciseIndex}
            lastSetIndex={lastSetIndex}
            onRemoveSet={() => removeSet(setOfExerciseIndex)}
          />
        )
      })}
      {Boolean(currentExercise) && (
        <AddSetButton
          ref={ref}
          icon='add'
          buttonType='button'
          type='button'
          variant='secondary'
          onClick={handleAddSetField}
        />
      )}
    </ExerciseWrapper>
  )
}
