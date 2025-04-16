import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import Skeleton from "react-loading-skeleton"
import { useTheme } from "styled-components"

import { ActivityPreset } from "@api/types/activityPresets.types"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Heading } from "@components/Modal/Modal.styled"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  deleteActivityPresetAction,
  getActivityPresetsAction,
} from "@features/activityPresets/activityPresetsActions"
import { setIsActivityPresetsVisible } from "@features/activityPresets/activityPresetsSlice"

import { PresetsActivitiesWrapper, StyledIcon, Wrapper } from "./PresetsView.styled"
import { PresetsViewProps } from "./PresetsView.types"
import { transformResponseExercises } from "./utils"
import { AddActivityFormTypes } from "../../AddActivityForm.types"
import { ActivityCard } from "../ActivityCard/ActivityCard"

export const PresetsView: React.FC<PresetsViewProps> = ({ setSelectValue }) => {
  const dispatch = useAppDispatch()
  const activityPresets = useAppSelector((state) => state.activityPresets.activityPresets)
  const status = useAppSelector((state) => state.activityPresets.status)

  const { reset } = useFormContext<AddActivityFormTypes>()

  const theme = useTheme()

  const handleRemovePreset = async (id: string) => {
    await dispatch(deleteActivityPresetAction(id))
  }

  const getPopoverOptions = (id: string) => [
    {
      label: "Delete preset",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleRemovePreset(id)
      },
    },
  ]

  const handleActivityCardClick = (activityPreset: ActivityPreset) => {
    const activityType = { label: activityPreset.type.type, value: activityPreset._id }
    setSelectValue(activityType)
    reset({
      title: activityPreset.title,
      activityType: {
        label: activityPreset.type.type,
        value: activityPreset.type._id,
      },
      exertionRating: activityPreset.exertionRating,
      notes: activityPreset.notes,
      warmup: activityPreset.warmup,
      repeatExercisesCount: activityPreset.repeatExercisesCount,
      exercises: transformResponseExercises(activityPreset.exercises),
    })
    dispatch(setIsActivityPresetsVisible(false))
  }

  useEffect(() => {
    const getPresets = async () => {
      await dispatch(getActivityPresetsAction())
    }
    getPresets()
  }, [dispatch])

  return (
    <Wrapper>
      <StyledIcon
        name='leftArrow'
        onClick={() => {
          dispatch(setIsActivityPresetsVisible(false))
        }}
        color={theme.secondary}
      />
      <Heading>Add from preset</Heading>
      {activityPresets.length === 0 && status !== RequestStatuses.LOADING && (
        <div>
          Currently you have no activities saved as presets. You can create new activity and save it
          as preset or mark existing one as preset.
        </div>
      )}
      <div>
        <SkeletonTheme>
          {status === RequestStatuses.LOADING ? (
            <Skeleton style={{ marginTop: "24px" }} height={102} count={5} />
          ) : (
            <PresetsActivitiesWrapper>
              {activityPresets?.map((activity) => {
                return (
                  <ActivityCard
                    key={activity._id}
                    data={activity}
                    popoverOptions={getPopoverOptions(activity._id)}
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
