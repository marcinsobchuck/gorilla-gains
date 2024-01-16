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
import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { getExercisesByActivityTypeAction } from "@features/exercises/exercisesActions"

import {
  AddExerciseButton,
  AddSetButton,
  BreaksWrapper,
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  FieldsWrapper,
  InputWarning,
  NestedInput,
  OthersInput,
  OthersWrapper,
  SetIndex,
  SetWrapper,
  SetsText,
  StyledCheckbox,
  StyledForm,
  StyledRemoveIcon,
  StyledSelect,
  SubmitButton,
  X,
} from "./AddActivityForm.styled"
import {
  ActivityType,
  AddActivityFormValues,
  Category,
  NestedSetsFieldArrayProps,
  SetsFormFields,
} from "./AddActivityForm.types"
import { transformActivityTypesIntoOption, transformExerciseIntoOption } from "./utils"

const breaksButtonsData = [
  {
    labelText: "30s",
    value: 30, //seconds
  },
  {
    labelText: "60s",
    value: 60,
  },
  {
    labelText: "90s",
    value: 90,
  },
  {
    labelText: "120s",
    value: 120,
  },
  {
    labelText: "150s",
    value: 150,
  },
]

const NestedSetsFieldArray: React.FC<NestedSetsFieldArrayProps> = ({
  exerciseIndex,
  lastExerciseIndex,
  withBreaks = false,
  setsFormFields,
  control,
}) => {
  const ref = useRef<HTMLButtonElement>(null)

  const { append, remove, fields } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  })

  const handleAddSetField = () => {
    append(setsFormFields)
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const handleRemoveSetField = (index: number) => remove(index)

  const fieldsKeys = Object.keys(setsFormFields as SetsFormFields)

  const getIsLastSetOfLastExercise = (setOfExerciseIndex: number) => {
    const lastSetIndex = fields.length - 1
    const isLastExercise = exerciseIndex === lastExerciseIndex
    const isLastSetOfLastExercise = isLastExercise && setOfExerciseIndex === lastSetIndex

    return isLastSetOfLastExercise
  }

  return (
    <React.Fragment key={exerciseIndex}>
      {fields.map((set, setOfExerciseIndex) => {
        return (
          <React.Fragment key={set.id}>
            <SetWrapper justify='space-between' align='center'>
              <SetIndex>{setOfExerciseIndex + 1}.</SetIndex>
              <NestedInput
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.${fieldsKeys[0]}`}
                type='number'
                label={fieldsKeys[0]}
                withIcon={false}
                withError={false}
              />
              <X>X</X>
              <NestedInput
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.${fieldsKeys[1]}`}
                type='number'
                label={fieldsKeys[1]}
                withIcon={false}
                withError={false}
              />

              <StyledRemoveIcon
                name='remove'
                width={20}
                height={20}
                onClick={() => handleRemoveSetField(setOfExerciseIndex)}
              />
            </SetWrapper>
            {withBreaks && !getIsLastSetOfLastExercise(setOfExerciseIndex) && (
              <BreaksWrapper justify='center' align='center'>
                <RadioButtonGroup
                  items={breaksButtonsData}
                  buttonVariant='tile'
                  name={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.break`}
                />
              </BreaksWrapper>
            )}
          </React.Fragment>
        )
      })}

      <AddSetButton
        ref={ref}
        icon='add'
        buttonType='button'
        type='button'
        variant='secondary'
        onClick={handleAddSetField}
      />
    </React.Fragment>
  )
}

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
          formFields: { reps: null, load: null },
        }
      case "endurance":
        return {
          element: AddExerciseElement,
          formFields: { duration: null, distance: null },
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
          formFields: {},
        }
    }
  }
  const renderElementPerActivityTypeCategory =
    currentActivityType &&
    getRenderInfoPerActivityTypeCategory(currentActivityType.category).element

  const setsFormFields =
    currentActivityType &&
    getRenderInfoPerActivityTypeCategory(currentActivityType.category).formFields
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
                  exerciseIndex={exerciseIndex}
                  lastExerciseIndex={lastExerciseIndex}
                  setsFormFields={setsFormFields}
                  withBreaks={withBreaks(exerciseIndex)}
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
