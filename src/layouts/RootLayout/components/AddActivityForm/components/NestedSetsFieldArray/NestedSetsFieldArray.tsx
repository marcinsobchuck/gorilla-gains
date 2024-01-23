import React, { useRef } from "react"
import { useFieldArray } from "react-hook-form"

import {
  AddSetButton,
  BreaksWrapper,
  CustomBreakInput,
  NestedInput,
  SetIndex,
  SetWrapper,
  StyledRadioButtonGroup,
  StyledRemoveIcon,
  X,
} from "../../AddActivityForm.styled"
import { NestedSetsFieldArrayProps, SetsFormFields } from "../../AddActivityForm.types"

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
    labelText: "120s",
    value: 120,
  },
]

export const NestedSetsFieldArray: React.FC<NestedSetsFieldArrayProps> = ({
  exerciseIndex,
  lastExerciseIndex,
  withBreaks = false,
  setsFormFields,
  control,
  watch,
  setValue,
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

  const getValue = (setOfExerciseIndex: number) => {
    const currentValue = watch(`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.break`)

    if (
      currentValue &&
      breaksButtonsData.map((buttonData) => buttonData.value).includes(+currentValue)
    ) {
      return ""
    }
    return currentValue
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
                <StyledRadioButtonGroup
                  items={breaksButtonsData}
                  buttonVariant='tile'
                  name={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.break`}
                />
                <CustomBreakInput
                  type='number'
                  placeholder='custom'
                  value={getValue(setOfExerciseIndex) || ""}
                  $isActive={Boolean(getValue(setOfExerciseIndex))}
                  onChange={(e) =>
                    setValue(
                      `exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.break`,
                      parseInt(e.currentTarget.value)
                    )
                  }
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
