import { useEffect, useRef } from "react"
import { Control, FormProvider, useFieldArray, useForm } from "react-hook-form"

import { Datepicker } from "@components/Datepicker/Datepicker"
import { Icon } from "@components/Icon/Icon"
import { Input } from "@components/Input/Input"

import { StyledRemoveIcon, StyledSelect } from "./AddActivityForm.styled"

const activityTypes = [
  {
    value: "calisthenics",
    label: "Calisthenics",
  },
  {
    value: "weight lifting",
    label: "Weight lifting",
  },
  {
    value: "walking",
    label: "Walking",
  },
  {
    value: "running",
    label: "Running",
  },
  {
    value: "swimming",
    label: "Swimming",
  },
]

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

interface NestedSetsFieldArrayProps {
  exerciseIndex: number
  control: Control
}

const NestedSetsFieldArray: React.FC<NestedSetsFieldArrayProps> = ({ exerciseIndex, control }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { append, remove, fields } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  })

  useEffect(() => {}, [fields.length])

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
          <div key={set.id}>
            <p>Set {setOfExerciseIndex + 1}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Input
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.reps`}
                type='number'
                label='Reps'
                withIcon={false}
              />
              <Input
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.load`}
                type='number'
                label='Load'
                withIcon={false}
              />
              <StyledRemoveIcon
                name='remove'
                onClick={() => handleRemoveSetField(setOfExerciseIndex)}
              />
            </div>
          </div>
        )
      })}
      <div ref={ref} style={{ scrollMarginBottom: "120px" }}>
        <Icon name='add' width={28} height={28} onClick={handleAddSetField} />
      </div>
    </div>
  )
}

export const AddActivityForm: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const methods = useForm({
    mode: "all",
  })
  const { control } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  })

  const handleAddExerciseField = () => {
    append({
      exercise: "",
      sets: [{ reps: "", load: "" }],
    })
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0)
  }

  const handleRemoveExerciseField = (index: number) => remove(index)

  return (
    <FormProvider {...methods}>
      <StyledSelect options={activityTypes} name='activityType' labelText='Activity type' />
      <Datepicker name='date' label='Date' />
      {fields.map((field, exerciseIndex) => {
        return (
          <div
            key={field.id}
            style={{
              marginBottom: "12px",
              padding: "24px",
              backgroundColor: "gray",
              borderRadius: "9px",
            }}
          >
            <h1>{exerciseIndex + 1}</h1>
            <Icon
              name='remove'
              onClick={() => handleRemoveExerciseField(exerciseIndex)}
              style={{ fill: "red", marginLeft: "auto" }}
            />
            <StyledSelect
              options={exercises}
              name={`exercises.${exerciseIndex}.exercise`}
              labelText='Exercise'
            />
            <p>Sets</p>
            <NestedSetsFieldArray control={control} exerciseIndex={exerciseIndex} />
          </div>
        )
      })}

      <div ref={ref} style={{ scrollMarginBottom: "60px" }}>
        <Icon name='add' width={48} height={48} onClick={handleAddExerciseField} />
      </div>
    </FormProvider>
  )
}
