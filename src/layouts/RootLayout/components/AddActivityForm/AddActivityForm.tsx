import debounce from "lodash.debounce"
import React, { useCallback, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { getExercisesByActivityType } from "@api/exercisesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { getExercisesByActivityTypeAction } from "@features/exercises/exercisesActions"

import {
  AddExerciseButton,
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  FieldsWrapper,
  InputWarning,
  OthersInput,
  OthersWrapper,
  SetsText,
  StyledCheckbox,
  StyledForm,
  StyledSelect,
  SubmitButton,
  X,
} from "./AddActivityForm.styled"
import { ActivityType, AddActivityFormValues, Category } from "./AddActivityForm.types"
import { NestedSetsFieldArray } from "./components/NestedSetsFieldArray/NestedSetsFieldArray"
import { transformActivityTypesIntoOption, transformExerciseIntoOption } from "./utils"

export const AddActivityForm: React.FC = () => {
  const [selectValue, setSelectValue] = useState<AsyncOption | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const activityTypes = useAppSelector((state) => state.activityTypes)
  const exercises = useAppSelector((state) => state.exercises)
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLButtonElement>(null)

  const methods = useForm<AddActivityFormValues>({
    mode: "all",
  })
  const { control, handleSubmit, watch, setValue, getValues } = methods
  const {
    fields,
    append,
    remove: removeExercises,
  } = useFieldArray({
    control,
    name: "exercises",
  })
  const currentActivityType = getValues("activityType")
  const currentExercises = watch("exercises")
  const exercisesNames = currentExercises?.map((exercise) => exercise.exercise.label)

  const withBreaks = (exerciseIndex: number) => watch(`exercises.${exerciseIndex}.withBreaks`)
  const lastExerciseIndex = fields.length - 1

  const handleAddExerciseField = () => {
    append(
      {
        exercise: {
          label: "",
          value: "",
        },
        sets: [setsFormFields],
        withBreaks: false,
      },
      { shouldFocus: false }
    )

    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const handleWarningYesOption = (category: Category) => {
    if (category === "other") {
      removeExercises()
    } else {
      handleAddExerciseField()
    }
  }

  const AddExerciseElement = (
    <AddExerciseButton
      ref={ref}
      buttonType='button'
      type='button'
      icon='add'
      onClick={handleAddExerciseField}
      disabled={!currentActivityType}
    />
  )

  const getRenderInfoPerActivityTypeCategory = (activityTypeCategory: Category) => {
    switch (activityTypeCategory) {
      case "strength":
        return {
          element: AddExerciseElement,
          setsFormFields: { reps: "", load: "" },
          addExercise: () =>
            append(
              {
                exercise: {
                  label: "",
                  value: "",
                },
                sets: [{ reps: "", load: "" }],
                withBreaks: false,
              },
              { shouldFocus: false }
            ),
        }
      case "endurance":
        return {
          element: AddExerciseElement,
          setsFormFields: { duration: "", distance: "" },
          addExercise: () =>
            append(
              {
                exercise: {
                  label: "",
                  value: "",
                },
                sets: [{ duration: "", distance: "" }],
                withBreaks: false,
              },
              { shouldFocus: false }
            ),
        }
      case "other":
        return {
          element: (
            <OthersWrapper justify='space-between' align='center'>
              <OthersInput
                id='duration'
                type='number'
                label='duration'
                withIcon={false}
                withError={false}
              />
              <X>X</X>
              <OthersInput
                id='distance'
                type='number'
                label='distance'
                withIcon={false}
                withError={false}
              />
            </OthersWrapper>
          ),
          setsFormFields: {},
          addExercise: () => {},
        }
    }
  }
  const renderElementPerActivityTypeCategory =
    currentActivityType &&
    getRenderInfoPerActivityTypeCategory(currentActivityType.category).element

  const setsFormFields =
    currentActivityType &&
    getRenderInfoPerActivityTypeCategory(currentActivityType.category).setsFormFields

  const handleRemoveExerciseField = (index: number) => removeExercises(index)

  const getActivityTypesOptions = async (inputValue: string) => {
    const response = await getActivityTypes({ filterText: inputValue })
    const activityTypes = response.data

    return transformActivityTypesIntoOption(activityTypes)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedActivityTypes = useCallback(
    debounce((inputValue, callback) => {
      getActivityTypesOptions(inputValue).then((options) => {
        callback(options)
      })
    }, 500),
    []
  )

  const getExercisesOptions = async (inputValue: string) => {
    const response = await getExercisesByActivityType({
      activityTypeId: watch("activityType").value,
      filterText: inputValue,
    })
    const exercises = response.data
    const currentExercises = watch("exercises")
    const exercisesNames = currentExercises?.map((exercise) => exercise.exercise.label)

    return transformExerciseIntoOption(exercisesNames, exercises)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedExercises = useCallback(
    debounce((inputValue, callback) => {
      getExercisesOptions(inputValue).then((options) => callback(options))
    }, 500),
    []
  )
  const onSubmit = handleSubmit((values) => {
    console.log(values)
  })

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit}>
        <FieldsWrapper>
          <StyledSelect
            name='activityType'
            labelText='Activity type'
            defaultOptions={transformActivityTypesIntoOption(activityTypes.data)}
            isLoading={activityTypes.status === RequestStatuses.LOADING}
            cacheOptions
            loadOptions={debouncedActivityTypes}
            value={selectValue}
            onChange={(newValue) => {
              if (currentActivityType && newValue?.value !== currentActivityType.value) {
                setIsWarningVisible(true)
                setSelectValue(newValue)
              } else if (currentActivityType?.value === newValue?.value) {
                setIsWarningVisible(false)
                setSelectValue(currentActivityType)
              } else {
                setSelectValue(currentActivityType)
                setValue("activityType", newValue as ActivityType)
                getRenderInfoPerActivityTypeCategory(newValue?.category as Category).addExercise()
              }
            }}
            onFocus={async () => {
              if (activityTypes.data) {
                return
              }
              await dispatch(getActivityTypesAction())
            }}
          />
          {isWarningVisible && (
            <InputWarning align='center' justify='space-between'>
              <p>
                This change will reset all exercises. <b>Are you sure?</b>
              </p>

              <FlexContainer>
                <Button
                  buttonType='button'
                  variant='tertiary'
                  onClick={() => {
                    removeExercises()
                    setValue("activityType", selectValue as ActivityType)
                    handleWarningYesOption(selectValue?.category as Category)
                    setIsWarningVisible(false)
                  }}
                >
                  Yes
                </Button>
                <Button
                  buttonType='button'
                  variant='tertiary'
                  onClick={() => {
                    setSelectValue(currentActivityType)
                    setIsWarningVisible(false)
                  }}
                >
                  No
                </Button>
              </FlexContainer>
            </InputWarning>
          )}
          <Datepicker name='date' label='Date' />
          <StyledCheckbox name='warmup' label='Warmup done?' />
          {fields.map((field, exerciseIndex) => {
            return (
              <ExerciseWrapper key={field.id}>
                <ExerciseHeader>
                  <ExerciseIndex>Exercise {exerciseIndex + 1}</ExerciseIndex>
                  <Icon name='close' onClick={() => handleRemoveExerciseField(exerciseIndex)} />
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
                        activityTypeId: currentActivityType.value,
                      })
                    )
                  }}
                  name={`exercises.${exerciseIndex}.exercise`}
                  labelText='Exercise'
                />
                <Checkbox label='Add breaks' name={`exercises.${exerciseIndex}.withBreaks`} />
                <SetsText>Sets</SetsText>
                <NestedSetsFieldArray
                  control={control}
                  watch={watch}
                  exerciseIndex={exerciseIndex}
                  lastExerciseIndex={lastExerciseIndex}
                  setsFormFields={setsFormFields}
                  withBreaks={withBreaks(exerciseIndex)}
                  setValue={setValue}
                />
              </ExerciseWrapper>
            )
          })}
          {renderElementPerActivityTypeCategory}

          <Textarea
            label='Notes'
            name='notes'
            placeholder='Comments, reflections, or reminders...'
          />
        </FieldsWrapper>

        <SubmitButton buttonType='button' type='submit' width={260}>
          Submit
        </SubmitButton>
      </StyledForm>
    </FormProvider>
  )
}
