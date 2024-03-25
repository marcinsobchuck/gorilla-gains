import React from "react"
import { useFormContext } from "react-hook-form"

import { breaksButtonsData } from "./constants"
import { SetItemProps } from "./SetItem.types"
import {
  BreaksWrapper,
  CustomBreakInput,
  NestedInput,
  SetIndex,
  SetWrapper,
  StyledRadioButtonGroup,
  StyledRemoveIcon,
  X,
} from "../../AddActivityForm.styled"
import { AddActivityFormTypes } from "../../AddActivityForm.types"
import { DurationInput } from "../DurationInput/DurationInput"

export const SetItem: React.FC<SetItemProps> = ({
  exerciseIndex,
  lastExerciseIndex,
  setOfExerciseIndex,
  lastSetIndex,
  onRemoveSet,
}) => {
  const { watch, setValue } = useFormContext<AddActivityFormTypes>()

  const currentActivityType = watch("activityType").label
  const isExerciseStatic = watch(`exercises.${exerciseIndex}.exercise.isStatic`)

  const withBreaks = watch(`exercises.${exerciseIndex}.withBreaks`)

  const getIsLastSetOfLastExercise = (setOfExerciseIndex: number) => {
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

  const renderInputs = (activityType: string, isExerciseStatic?: boolean) => {
    switch (activityType) {
      case "strength":
        return (
          <>
            {isExerciseStatic ? (
              <DurationInput
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.duration`}
              />
            ) : (
              <NestedInput
                id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.reps`}
                type='number'
                label='reps'
                withIcon={false}
              />
            )}
            <X>X</X>
            <NestedInput
              id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.load`}
              type='number'
              label='load'
              withIcon={false}
              unitSymbol='kg'
            />
          </>
        )
      case "endurance":
        return (
          <>
            <DurationInput id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.duration`} />
            <X>X</X>
            <NestedInput
              id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.distance`}
              type='number'
              label='distance'
              withIcon={false}
              unitSymbol='km'
            />
          </>
        )
      case "flexibility":
      case "balance":
        return (
          <DurationInput id={`exercises.${exerciseIndex}.sets.${setOfExerciseIndex}.duration`} />
        )
    }
  }

  return (
    <>
      <SetWrapper justify='space-between' align='center'>
        <SetIndex>{setOfExerciseIndex + 1}.</SetIndex>
        {renderInputs(currentActivityType, isExerciseStatic)}

        <StyledRemoveIcon name='remove' width={20} height={20} onClick={() => onRemoveSet()} />
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
    </>
  )
}
