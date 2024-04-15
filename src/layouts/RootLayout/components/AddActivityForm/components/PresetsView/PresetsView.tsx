import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { Activity, ResponseExercise } from "@api/types/activitiesService.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Heading } from "@components/Modal/Modal.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getPresetsForCurrentUserAction } from "@features/activities/activitiesActions"

import { PresetsActivitiesWrapper, StyledIcon, Wrapper } from "./PresetsView.styled"
import { PresetsViewProps } from "./PresetsView.types"
import { AddActivityFormTypes, Exercise } from "../../AddActivityForm.types"
import { ActivityCard } from "../ActivityCard/ActivityCard"

const transformExercises = (exercises: ResponseExercise[]): Exercise[] => {
  return exercises.map((rExercise) => {
    return {
      ...rExercise,
      exercise: {
        additionalInfo: rExercise.additionalInfo,
        isStatic: rExercise.exercise.isStatic,
        label: rExercise.exercise.name,
        value: rExercise.exercise._id,
      },
    }
  })
}

export const PresetsView: React.FC<PresetsViewProps> = ({
  setIsPresetsVisible,
  setSelectValue,
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.activities)
  const { reset } = useFormContext<AddActivityFormTypes>()

  const theme = useTheme()

  const handleActivityCardClick = (activity: Activity) => {
    const activityType = { label: activity.type.type, value: activity._id }
    setSelectValue(activityType)
    reset({
      title: activity.title,
      activityType: {
        label: activity.type.type,
        value: activity.type._id,
      },
      exertionRating: activity.exertionRating,
      notes: activity.notes,
      warmup: activity.warmup,
      repeatExercisesCount: activity.repeatExercisesCount,
      exercises: transformExercises(activity.exercises),
    })
    setIsPresetsVisible(false)
  }

  useEffect(() => {
    const getPresets = async () => {
      await dispatch(getPresetsForCurrentUserAction())
    }

    getPresets()
  }, [dispatch])

  return (
    <Wrapper>
      <StyledIcon
        name='leftArrow'
        onClick={() => {
          setIsPresetsVisible(false)
        }}
        color={theme.secondary}
      />
      <Heading>Add from preset</Heading>
      {state.presetsData?.length === 0 && (
        <div>
          Currently you have no activities saved as presets. Go back, create one and save as preset
          to see it here.
        </div>
      )}
      <div>
        <SkeletonTheme>
          {state.presetsStatus === RequestStatuses.LOADING ? (
            <Skeleton style={{ marginTop: "24px" }} height={102} count={5} />
          ) : (
            <PresetsActivitiesWrapper>
              {state.presetsData?.map((activity) => {
                return (
                  <ActivityCard
                    key={activity._id}
                    data={activity}
                    onClick={() => {
                      handleActivityCardClick(activity)
                    }}
                  />
                )
              })}
            </PresetsActivitiesWrapper>
          )}
        </SkeletonTheme>
      </div>
    </Wrapper>
  )
}
