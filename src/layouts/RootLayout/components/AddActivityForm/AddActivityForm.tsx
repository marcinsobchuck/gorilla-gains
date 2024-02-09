// import { zodResolver } from "@hookform/resolvers/zod"
import debounce from "lodash.debounce"
import React, { useCallback, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"

import {
  AddExerciseButton,
  FieldsWrapper,
  OthersInput,
  OthersWrapper,
  StyledCheckbox,
  StyledForm,
  StyledSelect,
  SubmitButton,
} from "./AddActivityForm.styled"
import { ActivityType, AddActivityFormValues } from "./AddActivityForm.types"
import { DurationInput } from "./components/DurationInput/DurationInput"
import { ExerciseItem } from "./components/ExerciseItem/ExerciseItem"
import { InputChangeWarning } from "./components/InputChangeWarning/InputChangeWarning"
import { defaultExercise, exerciseField } from "./constants"
import { transformActivityTypesIntoOption } from "./utils"

const workoutActivity: AddActivityFormValues = {
  activityType: {
    category: "",
    label: "",
    value: "",
  },
  date: "",
  notes: "",
  warmup: true,
}

export const AddActivityForm: React.FC = () => {
  const [selectValue, setSelectValue] = useState<AsyncOption | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const activityTypes = useAppSelector((state) => state.activityTypes)
  const dispatch = useAppDispatch()

  const addExerciseButtonRef = useRef<HTMLButtonElement>(null)

  const methods = useForm<AddActivityFormValues>({
    mode: "all",
    defaultValues: workoutActivity,

    // resolver: zodResolver(addActivityFormSchema),
  })
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
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

    setTimeout(
      () => addExerciseButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }),
      0
    )
  }
  const handleRemoveExercise = (exerciseIndex?: number | number[]) => removeExercise(exerciseIndex)

  const handleWarningYesOption = (category: string) => {
    if (category === "other") {
      removeExercise()
    } else {
      handleAddExerciseField()
    }
  }

  const AddExerciseElement = (
    <AddExerciseButton
      ref={addExerciseButtonRef}
      buttonType='button'
      type='button'
      icon='add'
      onClick={handleAddExerciseField}
      disabled={!currentActivityType}
    />
  )

  const getRenderInfoPerActivityTypeCategory = (activityTypeCategory: string) => {
    switch (activityTypeCategory) {
      case "strength":
        return {
          element: AddExerciseElement,
          addExercise: () =>
            addExercise(
              {
                exercise: exerciseField,
                withBreaks: false,
              },
              { shouldFocus: false }
            ),
        }
      case "endurance":
        return {
          element: AddExerciseElement,
          addExercise: () =>
            addExercise(
              {
                exercise: exerciseField,
                withBreaks: false,
              },
              { shouldFocus: false }
            ),
        }
      case "other":
        return {
          element: (
            <OthersWrapper direction='column' justify='space-between'>
              <DurationInput id='duration' label='Duration' />
              <OthersInput
                id='distance'
                type='number'
                step='0.001'
                label='distance'
                withIcon={false}
                withError={false}
                unitSymbol='km'
              />
            </OthersWrapper>
          ),
          addExercise: () => {},
        }
      default:
        return {
          element: null,
          addExercise: () => {},
        }
    }
  }

  const renderElementPerActivityTypeCategory =
    currentActivityType &&
    getRenderInfoPerActivityTypeCategory(currentActivityType.category).element

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

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    console.log(errors)
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
                setSelectValue(currentActivityType.value === "" ? newValue : currentActivityType)
                setValue("activityType", newValue as ActivityType)
                getRenderInfoPerActivityTypeCategory(newValue?.category as string).addExercise()
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
            onAccept={() => {
              removeExercise()
              setValue("activityType", selectValue as ActivityType)
              handleWarningYesOption(selectValue?.category as string)
              setIsWarningVisible(false)
            }}
            onDecline={() => {
              setSelectValue(currentActivityType)
              setIsWarningVisible(false)
            }}
          />
          <Datepicker name='date' label='Date' withError />
          <StyledCheckbox name='warmup' label='Warmup done?' />

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
