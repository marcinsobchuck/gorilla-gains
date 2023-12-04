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
  const { append, remove, fields } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  })

  return (
    <div>
      {fields.map((set, setIndex) => {
        return (
          <div key={set.id}>
            <p>Set {setIndex + 1}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Input
                id={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                type='number'
                label='Reps'
                withIcon={false}
              />
              <Input
                id={`exercises.${exerciseIndex}.sets.${setIndex}.load`}
                type='number'
                label='Load'
                withIcon={false}
              />
              <StyledRemoveIcon name='remove' onClick={() => remove(setIndex)} />
            </div>
          </div>
        )
      })}
      <Icon
        name='add'
        width={28}
        height={28}
        onClick={() => {
          append({
            sets: [{ reps: "", load: "" }],
          })
        }}
      />
    </div>
  )
}

export const AddActivityForm: React.FC = () => {
  const methods = useForm({
    mode: "all",
  })
  const { control } = methods
  const { fields, append } = useFieldArray({
    control,
    name: "exercises",
  })

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
      <Icon
        name='add'
        width={48}
        height={48}
        onClick={() =>
          append({
            exercise: "",
            sets: [{ reps: "", load: "" }],
          })
        }
      />
    </FormProvider>
  )
}
