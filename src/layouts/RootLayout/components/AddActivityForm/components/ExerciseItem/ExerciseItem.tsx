import debounce from "lodash.debounce"
import { useCallback, useRef } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { getExercisesByActivityType } from "@api/exercisesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { Icon } from "@components/Icon/Icon"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getExercisesByActivityTypeAction } from "@features/exercises/exercisesActions"

import { CustomOptionLabel } from "./CustomOptionLabel"
import { AddSetButton, SetsError } from "./ExerciseItem.styled"
import { ExerciseItemProps } from "./ExerciseItem.types"
import {
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  SetsHeading,
  SetsText,
  StyledSelect,
} from "../../AddActivityForm.styled"
import { AddActivityFormTypes, ExerciseFields } from "../../AddActivityForm.types"
import {
  balanceExerciseFields,
  enduranceExerciseFields,
  flexibilityExerciseFields,
  strengthNonStaticExerciseFields,
  strengthStaticExerciseFields,
} from "../../constants"
import { transformExerciseIntoOption } from "../../utils"
import { SetItem } from "../SetItem/SetItem"

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exerciseIndex,
  activityTypeId,
  lastExerciseIndex,
  onRemoveExercise,
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AddActivityFormTypes>()

  const {
    append: addSet,
    remove: removeSet,
    fields,
  } = useFieldArray({
    name: `exercises.${exerciseIndex}.sets`,
  })

  const currentActivityType = watch("activityType").label
  const currentExercise = watch(`exercises.${exerciseIndex}.exercise.value`)
  const isExerciseStatic = watch(`exercises.${exerciseIndex}.exercise.isStatic`)

  const getSetsFormFields = (activityType: string, isExerciseStatic?: boolean) => {
    switch (activityType) {
      case "strength":
        return isExerciseStatic ? strengthStaticExerciseFields : strengthNonStaticExerciseFields
      case "endurance":
        return enduranceExerciseFields
      case "flexibility":
        return flexibilityExerciseFields
      case "balance":
        return balanceExerciseFields
      default:
        return {}
    }
  }

  const ref = useRef<HTMLButtonElement>(null)

  const handleAddSetField = (isExerciseStatic: boolean) => {
    addSet(getSetsFormFields(currentActivityType, isExerciseStatic), { shouldFocus: false })
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const lastSetIndex = fields.length - 1

  const exercises = useAppSelector((state) => state.exercises)
  const dispatch = useAppDispatch()

  const getExercisesOptions = async (inputValue: string) => {
    try {
      const response = await getExercisesByActivityType({
        activityTypeId: watch("activityType").value,
        filterText: inputValue,
      })
      const exercises = response.data

      return transformExerciseIntoOption(exercises)
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
          transformExerciseIntoOption(exercises.data)
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
        classNamePrefix='nested'
        formatOptionLabel={(data) => <CustomOptionLabel data={data} />}
        onChange={(newValue) => {
          if (newValue?.value !== currentExercise) {
            removeSet()
            handleAddSetField(newValue?.isStatic as boolean)
            setValue(`exercises.${exerciseIndex}.exercise`, newValue as ExerciseFields, {
              shouldValidate: true,
            })
          }
        }}
        name={`exercises.${exerciseIndex}.exercise`}
        labelText='Exercise'
      />
      {Boolean(currentExercise) && (
        <>
          <Checkbox label='Add breaks' name={`exercises.${exerciseIndex}.withBreaks`} />
          <SetsHeading>
            <SetsText>Sets</SetsText>
            <SetsError errors={errors} name={`exercises.${exerciseIndex}.sets`} />
          </SetsHeading>
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
          onClick={() => handleAddSetField(isExerciseStatic)}
        />
      )}
    </ExerciseWrapper>
  )
}
