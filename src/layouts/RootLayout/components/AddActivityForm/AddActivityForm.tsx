import debounce from "lodash.debounce"
import { useCallback, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { getExercisesByActivityType } from "@api/exercisesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Option } from "@components/Select/Select.types"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"
import { getExercisesByActivityTypeAction } from "@features/exercises/exercisesActions"

import {
  AddExerciseButton,
  AddSetButton,
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  FieldsWrapper,
  InputWarning,
  NestedInput,
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
import { NestedSetsFieldArrayProps } from "./AddActivityForm.types"
import { transformActivityTypesIntoOption, transformExerciseIntoOption } from "./utils"

const NestedSetsFieldArray: React.FC<NestedSetsFieldArrayProps> = ({ exerciseIndex, control }) => {
  const ref = useRef<HTMLButtonElement>(null)

  const { append, remove, fields } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  })

  const handleAddSetField = () => {
    append({
      sets: [{ reps: "", load: "" }],
    })
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const handleRemoveSetField = (index: number) => remove(index)

  return (
    <div key={exerciseIndex}>
      {fields.map((set, setOfExerciseIndex) => {
        return (
          <SetWrapper key={set.id}>
            <SetIndex>{setOfExerciseIndex + 1}.</SetIndex>
            <NestedInput
              id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.reps`}
              type='number'
              label='Reps'
              withIcon={false}
              withError={false}
            />
            <X>X</X>
            <NestedInput
              id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.load`}
              type='number'
              label='Load'
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
    </div>
  )
}

export const AddActivityForm: React.FC = () => {
  const [selectValue, setSelectValue] = useState<Option | null>(null)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const activityTypes = useAppSelector((state) => state.activityTypes)
  const exercises = useAppSelector((state) => state.exercises)
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLButtonElement>(null)

  const methods = useForm({
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

  const handleAddExerciseField = () => {
    append(
      {
        exercise: "",
        sets: [{ reps: "", load: "" }],
      },
      { shouldFocus: false }
    )
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const handleRemoveExerciseField = (index: number) => removeExercises(index)

  const getActivityTypesOptions = async (inputValue: string) => {
    const response = await getActivityTypes({ filterText: inputValue })
    const activityTypes = response.data

    return transformActivityTypesIntoOption(activityTypes)
  }

  const debouncedActivityTypes = useCallback(
    debounce((inputText, callback) => {
      getActivityTypesOptions(inputText).then((options) => {
        console.log(options)
        callback(options)
      })
    }, 500),
    []
  )

  const loadExercises = async (inputValue: string) => {
    const response = await getExercisesByActivityType({
      activityTypeId: watch("activityType").value,
      filterText: inputValue,
    })

    const exercises = response.data

    return transformExerciseIntoOption(exercises)
  }
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
                setValue("activityType", newValue)
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
                    setValue("activityType", selectValue)
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
                    transformExerciseIntoOption(exercises.data)
                  }
                  cacheOptions
                  isLoading={exercises.status === RequestStatuses.LOADING}
                  loadOptions={loadExercises}
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
                <SetsText>Sets</SetsText>
                <NestedSetsFieldArray control={control} exerciseIndex={exerciseIndex} />
              </ExerciseWrapper>
            )
          })}
          <AddExerciseButton
            ref={ref}
            buttonType='button'
            type='button'
            icon='add'
            onClick={handleAddExerciseField}
            disabled={!currentActivityType}
          />

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
