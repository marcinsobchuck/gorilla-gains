import { useRef } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { getActivityTypes } from "@api/activityTypesService"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Datepicker } from "@components/Datepicker/Datepicker"
import { Icon } from "@components/Icon/Icon"
import { Textarea } from "@components/Textarea/Textarea"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getActivityTypesAction } from "@features/activityTypes/activityTypesActions"

import {
  AddExerciseButton,
  AddSetButton,
  ExerciseHeader,
  ExerciseIndex,
  ExerciseWrapper,
  FieldsWrapper,
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

const exercises = [
  {
    value: "pull up",
    label: "Pull up",
  },
  {
    value: "push up",
    label: "Push up",
  },
]

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
  const activityTypes = useAppSelector((state) => state.activityTypes)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLButtonElement>(null)
  const methods = useForm({
    mode: "all",
  })
  const { control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  })

  const transformIntoOption = () => {
    return activityTypes.data?.map((item) => ({
      value: item.type,
      label: item.type,
    }))
  }

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

  const handleRemoveExerciseField = (index: number) => remove(index)

  const onSubmit = handleSubmit((values) => {
    console.log(values)
  })

  const loadActivityTypes = async (inputValue: string) => {
    const response = await getActivityTypes({ filterText: inputValue })
    const activityTypes = response.data

    return activityTypes.map((activityType) => ({
      value: activityType.type,
      label: activityType.type,
    }))
  }

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmit}>
        <FieldsWrapper>
          <StyledSelect
            name='activityType'
            labelText='Activity type'
            cacheOptions
            defaultOptions={transformIntoOption()}
            isLoading={activityTypes.status === RequestStatuses.LOADING}
            loadOptions={loadActivityTypes}
            onFocus={async () => {
              if (activityTypes.data) {
                return
              }
              await dispatch(getActivityTypesAction())
            }}
          />
          <Datepicker name='date' label='Date' />
          <StyledCheckbox name='warmup' label='Warmup done?' />

          {fields.map((field, exerciseIndex) => {
            return (
              <ExerciseWrapper key={field.id}>
                <ExerciseHeader>
                  <ExerciseIndex>Activity {exerciseIndex + 1}</ExerciseIndex>
                  <Icon name='close' onClick={() => handleRemoveExerciseField(exerciseIndex)} />
                </ExerciseHeader>

                <StyledSelect
                  options={exercises}
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
