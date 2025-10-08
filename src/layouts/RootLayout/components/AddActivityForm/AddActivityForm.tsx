import { yupResolver } from "@hookform/resolvers/yup"
import { format, parseISO } from "date-fns"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { useTheme } from "styled-components"

import { getActivityTypes } from "@api/activityTypesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { Counter } from "@components/Counter/Counter"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { FormError } from "@components/FormError/FormError"
import { Input } from "@components/Input/Input"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { Routes } from "@enums/routes.enum"
import { createActivityAction, editActivityAction } from "@features/activities/activitiesActions"
import { setIsActivityPresetsVisible } from "@features/activityPresets/activityPresetsSlice"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { useScrollLock } from "@hooks/useLockScroll"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import {
  AddExerciseButton,
  AddExerciseWrapper,
  FieldsWrapper,
  PresetsButton,
  StyledCheckbox,
  StyledForm,
  StyledLoader,
  StyledSelect,
  SubmitButton,
  SubmitButtonsWrapper,
} from "./AddActivityForm.styled"
import { ActivityType } from "./AddActivityForm.types"
import { ExerciseItem } from "./components/ExerciseItem/ExerciseItem"
import { ExertionRating } from "./components/ExertionRating/ExertionRating"
import { InputChangeWarning } from "./components/InputChangeWarning/InputChangeWarning"
import { PresetsView } from "./components/PresetsView/PresetsView"
import { addActivityFormSchema } from "./config"
import { defaultExercise, exerciseField } from "./constants"
import { getDataToSubmit, transformActivityTypesIntoOption, transformEditedActivity } from "./utils"

export const AddActivityForm = () => {
  const [isCustomTitle, setIsCustomTitle] = useState(false)
  const [selectValue, setSelectValue] = useState<AsyncOption | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const isActivityPresetsVisible = useAppSelector((state) => state.activityPresets.isActivityPresetsVisible)
  const creatingActionStatus = useAppSelector((state) => state.activities.createActivityStatus)
  const editingActionStatus = useAppSelector((state) => state.activities.editActivityStatus)
  const activityTypes = useAppSelector((state) => state.activityTypes)
  const isEditing = useAppSelector((state) => state.activities.isEditing)
  const currentlyEditedActivity = useAppSelector((state) => state.activities.currentlyEditedActivity)
  const selectedDate = useAppSelector((state) => state.calendarScheduler.selectedDate)
  const dispatch = useAppDispatch()
  const addExerciseButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const theme = useTheme()

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
    reset,
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
    addExercise(defaultExercise, {
      shouldFocus: false,
    })
    trigger("exercises")
    setTimeout(
      () =>
        addExerciseButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        }),
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
      const response = await getActivityTypes({
        filterText: inputValue,
      })
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

  const onSubmit = () =>
    handleSubmit(async (values) => {
      const dataToSubmit = getDataToSubmit(values)

      const submitEdit = async () => {
        if (currentlyEditedActivity) {
          await dispatch(
            editActivityAction({
              activityId: currentlyEditedActivity._id,
              dataToEdit: dataToSubmit,
            })
          )
        }
      }

      const submitCreate = async () => await dispatch(createActivityAction({ data: dataToSubmit, theme }))

      isEditing ? submitEdit() : submitCreate()
    })

  const activityTypeLabel = watch("activityType.label")
  const date = watch("date")
  const formattedActivityLabel = capitalizeFirstLetter(activityTypeLabel)
  const formattedDate = date ? format(date, "LLLL do, y") : ""
  const defaultTitleValue = `${formattedActivityLabel ? formattedActivityLabel : ""}${formattedDate ? " - " + formattedDate : ""}`

  useEffect(() => {
    if (!isCustomTitle && !isEditing && (activityTypeLabel || date)) {
      setValue("title", defaultTitleValue, {
        shouldValidate: true,
      })
    }
  }, [activityTypeLabel, date, defaultTitleValue, isCustomTitle, isEditing, setValue])

  useEffect(() => {
    if (location.pathname === Routes.CALENDAR) {
      setValue("date", parseISO(selectedDate))
    }
  }, [location.pathname, selectedDate, setValue])

  useEffect(() => {
    if (isEditing && currentlyEditedActivity) {
      const {
        type: { type, _id },
      } = currentlyEditedActivity

      const activityType = {
        label: type,
        value: _id,
      }

      setSelectValue(activityType)
      reset(transformEditedActivity(currentlyEditedActivity))
    }
  }, [currentlyEditedActivity, isEditing, reset])

  useScrollLock({ autoLock: isActivityPresetsVisible, lockTarget: "#add-activity-modal" })

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit()}>
        <PresetsButton
          buttonType='button'
          type='button'
          variant='primary'
          onClick={() => dispatch(setIsActivityPresetsVisible(true))}
        >
          Add from preset
        </PresetsButton>
        {isActivityPresetsVisible && <PresetsView setSelectValue={setSelectValue} />}
        <FieldsWrapper>
          <Input id='title' label='Title' type='text' onChange={() => setIsCustomTitle(true)} autoFocus />
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
                setValue("activityType", newValue as ActivityType, {
                  shouldValidate: true,
                })
                addExercise(
                  {
                    exercise: exerciseField,
                    withBreaks: false,
                  },
                  {
                    shouldFocus: false,
                  }
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
          {fields.length > 0 && <Counter label='Repeat all' id='repeatExercisesCount' />}

          {fields.map((field, exerciseIndex) => {
            return (
              <ExerciseItem
                key={field.id}
                exerciseIndex={exerciseIndex}
                lastExerciseIndex={lastExerciseIndex}
                onRemoveExercise={handleRemoveExercise}
                activityType={currentActivityType.value}
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

          <StyledCheckbox name='warmup' label='Warmup done' />

          <Textarea label='Notes' name='notes' placeholder='Comments, reflections, or reminders...' />
          <ExertionRating />
        </FieldsWrapper>

        <SubmitButtonsWrapper justify='space-between'>
          <Checkbox name='makePresetFrom' label='Make preset from' />

          <SubmitButton buttonType='button' type='submit' width={160} data-testid='submit-button'>
            {isEditing ? "Edit" : "Add"}
          </SubmitButton>
          {(creatingActionStatus === RequestStatuses.LOADING || editingActionStatus === RequestStatuses.LOADING) && (
            <StyledLoader width={26} height={26} />
          )}
        </SubmitButtonsWrapper>
      </StyledForm>
    </FormProvider>
  )
}
