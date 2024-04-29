import { yupResolver } from "@hookform/resolvers/yup"
import debounce from "lodash.debounce"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Counter } from "@components/Counter/Counter"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { FormError } from "@components/FormError/FormError"
import { Input } from "@components/Input/Input"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { createActivityAction, editActivityAction } from "@features/activities/activitiesActions"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { dateToLocaleDateString } from "@utils/dateToLocaleDateString"

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
import { ActivityType, AddActivityFormProps } from "./AddActivityForm.types"
import { ExerciseItem } from "./components/ExerciseItem/ExerciseItem"
import { ExertionRating } from "./components/ExertionRating/ExertionRating"
import { InputChangeWarning } from "./components/InputChangeWarning/InputChangeWarning"
import { PresetsView } from "./components/PresetsView/PresetsView"
import { addActivityFormSchema } from "./config"
import { defaultExercise, exerciseField } from "./constants"
import {
  capitalizeFirstLetter,
  getDataToSubmit,
  getSubmitButtonText,
  transformActivityTypesIntoOption,
  transformEditedActivity,
} from "./utils"

export const AddActivityForm: React.FC<AddActivityFormProps> = ({
  isPresetsVisible,
  setIsPresetsVisible,
}) => {
  const [isCustomTitle, setIsCustomTitle] = useState(false)
  const [selectValue, setSelectValue] = useState<AsyncOption | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const creatingActionStatus = useAppSelector((state) => state.activities.createActivityStatus)
  const editingActionStatus = useAppSelector((state) => state.activities.editActivityStatus)
  const activityTypes = useAppSelector((state) => state.activityTypes)
  const isEditing = useAppSelector((state) => state.activities.isEditing)
  const currentlyEditedActivity = useAppSelector(
    (state) => state.activities.currentlyEditedActivity
  )
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

  const onSubmit = (isPreset?: boolean) =>
    handleSubmit(async (values) => {
      const dataToSubmit = getDataToSubmit(values, isPreset)

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

      const submitCreate = async () => await dispatch(createActivityAction(dataToSubmit))

      isEditing && currentlyEditedActivity ? submitEdit() : submitCreate()
    })

  const activityTypeLabel = capitalizeFirstLetter(watch("activityType.label"))
  const dateValue = dateToLocaleDateString(watch("date"))
  const defaultTitleValue = `${activityTypeLabel ? activityTypeLabel : ""}${dateValue ? " - " + dateValue : ""}`

  useEffect(() => {
    if (!isCustomTitle && !isEditing && (activityTypeLabel || dateValue)) {
      setValue("title", defaultTitleValue, {
        shouldValidate: true,
      })
    }
  }, [activityTypeLabel, dateValue, defaultTitleValue, isCustomTitle, isEditing, setValue])

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

  const renderSubmitButtontext = (
    buttonAction: "preset" | "addEdit",
    isEditing: boolean,
    isPreset?: boolean
  ) => {
    return getSubmitButtonText(buttonAction, isEditing, isPreset)
  }

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit()}>
        <PresetsButton
          buttonType='button'
          type='button'
          variant='primary'
          onClick={() => setIsPresetsVisible(true)}
        >
          Add from preset
        </PresetsButton>
        {isPresetsVisible && (
          <PresetsView setIsPresetsVisible={setIsPresetsVisible} setSelectValue={setSelectValue} />
        )}
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
          <ExertionRating />
        </FieldsWrapper>

        <SubmitButtonsWrapper justify='center'>
          <SubmitButton
            buttonType='button'
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              onSubmit(currentlyEditedActivity?.isPreset ? false : true)()
            }}
            width={240}
          >
            {renderSubmitButtontext("preset", isEditing, currentlyEditedActivity?.isPreset)}
          </SubmitButton>
          <SubmitButton buttonType='button' type='submit' width={120}>
            {renderSubmitButtontext("addEdit", isEditing)}
          </SubmitButton>
          {(creatingActionStatus === RequestStatuses.LOADING ||
            editingActionStatus === RequestStatuses.LOADING) && (
            <StyledLoader width={26} height={26} />
          )}
        </SubmitButtonsWrapper>
      </StyledForm>
    </FormProvider>
  )
}
