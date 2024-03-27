import { yupResolver } from "@hookform/resolvers/yup"
import debounce from "lodash.debounce"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { CreateActivityData } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Counter } from "@components/Counter/Counter"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { FormError } from "@components/FormError/FormError"
import { Input } from "@components/Input/Input"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { createActivityAction } from "@features/activities/activitiesActions"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"

import {
  AddExerciseButton,
  AddExerciseWrapper,
  FieldsWrapper,
  StyledCheckbox,
  StyledForm,
  StyledSelect,
  SubmitButton,
} from "./AddActivityForm.styled"
import { ActivityType } from "./AddActivityForm.types"
import { ExerciseItem } from "./components/ExerciseItem/ExerciseItem"
import { InputChangeWarning } from "./components/InputChangeWarning/InputChangeWarning"
import { addActivityFormSchema } from "./config"
import { defaultExercise, exerciseField } from "./constants"
import { capitalizeFirstLetter, transformActivityTypesIntoOption } from "./utils"

export const AddActivityForm: React.FC = () => {
  const [isCustomTitle, setIsCustomTitle] = useState(false)
  const [selectValue, setSelectValue] = useState<AsyncOption | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const activityTypes = useAppSelector((state) => state.activityTypes)
  const dispatch = useAppDispatch()

  const addExerciseButtonRef = useRef<HTMLButtonElement>(null)

  const methods = useForm({
    mode: "all",
    defaultValues: {
      repeatExercisesCount: 1,
    },
    resolver: yupResolver(addActivityFormSchema),
  })
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    trigger,
    watch,
  } = methods
  const {
    fields,
    append: addExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: "exercises",
  })
  const lastExerciseIndex = fields.length - 1
  const currentActivityType = getValues("activityType")
  const handleAddExerciseField = () => {
    addExercise(defaultExercise, { shouldFocus: false })
    trigger("exercises")
    setTimeout(
      () => addExerciseButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }),
      0
    )
  }
  const handleRemoveExercise = (exerciseIndex?: number | number[]) => removeExercise(exerciseIndex)

  const handleWarningYesOption = () => {
    removeExercise()
    setValue("activityType", selectValue as ActivityType)
    handleAddExerciseField()
    setIsWarningVisible(false)
  }

  const handleWarningNoOption = () => {
    setSelectValue(currentActivityType)
    setIsWarningVisible(false)
  }

  const getActivityTypesOptions = async (inputValue: string) => {
    try {
      const response = await getActivityTypes({ filterText: inputValue })
      const activityTypes = response.data
      return transformActivityTypesIntoOption(activityTypes)
    } catch (err) {
      console.log(err)
    }
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

  const onSubmit = handleSubmit(async (values) => {
    const { title, activityType, date, notes, repeatExercisesCount, warmup, exercises } = values

    const transformedExercises = exercises?.map((exercise) => {
      return { ...exercise, exercise: exercise.exercise.value }
    })

    const dataToSubmit: CreateActivityData = {
      title,
      type: activityType.value,
      date,
      notes,
      warmup,
      repeatExercisesCount,
      exercises: transformedExercises,
    }

    const result = await dispatch(createActivityAction(dataToSubmit))
    console.log({ dataToSubmit, result, exercises })
  })

  const activityTypeLabel = capitalizeFirstLetter(watch("activityType.label"))
  const dateValue = watch("date")?.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const defaultTitleValue = `${activityTypeLabel ? activityTypeLabel : ""}${dateValue ? " - " + dateValue : ""}`

  useEffect(() => {
    if (!isCustomTitle && (activityTypeLabel || dateValue)) {
      setValue("title", defaultTitleValue, { shouldValidate: true, shouldDirty: false })
    }
  }, [activityTypeLabel, dateValue, defaultTitleValue, isCustomTitle, setValue])

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit}>
        <FieldsWrapper>
          <Input id='title' label='Title' type='text' onChange={() => setIsCustomTitle(true)} />
          <StyledSelect
            name='activityType'
            labelText='Activity type'
            defaultOptions={transformActivityTypesIntoOption(activityTypes.data)}
            isLoading={activityTypes.status === RequestStatuses.LOADING}
            cacheOptions
            loadOptions={debouncedActivityTypes}
            value={selectValue}
            onChange={(newValue) => {
              if (
                currentActivityType &&
                currentActivityType.value !== "" &&
                newValue?.value !== currentActivityType.value
              ) {
                setIsWarningVisible(true)
                setSelectValue(newValue)
              } else if (currentActivityType?.value === newValue?.value) {
                setIsWarningVisible(false)
                setSelectValue(currentActivityType)
              } else {
                setSelectValue(currentActivityType?.value === "" ? newValue : currentActivityType)
                setValue("activityType", newValue as ActivityType, { shouldValidate: true })
                addExercise(
                  {
                    exercise: exerciseField,
                    withBreaks: false,
                  },
                  { shouldFocus: false }
                )
              }
            }}
            onFocus={async () => {
              if (activityTypes.data) {
                return
              }
              await dispatch(getActivityTypesAction())
            }}
          />
          <InputChangeWarning
            isVisible={isWarningVisible}
            onAccept={handleWarningYesOption}
            onDecline={handleWarningNoOption}
          />
          <Datepicker name='date' label='Date' withError />
          <StyledCheckbox name='warmup' label='Warmup done?' />
          {fields.length > 0 && <Counter label='Repeat all' id='repeatExercisesCount' />}

          {fields.map((field, exerciseIndex) => {
            return (
              <ExerciseItem
                key={field.id}
                exerciseIndex={exerciseIndex}
                lastExerciseIndex={lastExerciseIndex}
                onRemoveExercise={handleRemoveExercise}
                activityTypeId={currentActivityType.value}
              />
            )
          })}

          {currentActivityType && (
            <AddExerciseWrapper justify='center'>
              <AddExerciseButton
                ref={addExerciseButtonRef}
                buttonType='button'
                type='button'
                icon='add'
                onClick={handleAddExerciseField}
                disabled={!currentActivityType}
              ></AddExerciseButton>
              <FormError errors={errors} name='exercises' />
            </AddExerciseWrapper>
          )}
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
