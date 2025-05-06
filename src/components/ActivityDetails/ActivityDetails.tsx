import { format, parseISO } from "date-fns"
import { useTheme } from "styled-components"

import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"
import { useMediaQuery } from "@hooks/useMediaQuery"

import {
  DescriptionText,
  ExerciseName,
  ExercisesContainer,
  ExercisesSectionHeading,
  ExertionRatingContainer,
  HeadingContainer,
  Notes,
  SetsTable,
} from "./ActivityDetails.styled"
import { ActivityDetailsProps } from "./ActivityDetails.types"
import { getDurationString, getExerciseMetrics } from "./utils"

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activityDetails }) => {
  const theme = useTheme()

  const isMedium = useMediaQuery(Breakpoints.MEDIUM)

  return (
    <>
      <HeadingContainer align='center'>
        <ActivityTypeBadge
          activityType={activityDetails.type.type}
          title={activityDetails.title}
          subtitle={format(parseISO(activityDetails.date), "LLLL d, y")}
          iconSize={isMedium ? 32 : 26}
          titleSize={20}
          iconPadding={isMedium ? 16 : 14}
        />
      </HeadingContainer>
      {activityDetails.notes && <Notes>{activityDetails.notes}</Notes>}

      <FlexContainer>
        <ExercisesSectionHeading justify='space-between' align='flex-end'>
          <p>Exercises</p>
          {activityDetails.exertionRating && (
            <ExertionRatingContainer direction='column'>
              <FlexContainer justify='center'>
                {Array.from({ length: activityDetails.exertionRating }).map((_, index) => (
                  <Icon key={index} name='fire' color={theme.secondary} width={22} height={22} />
                ))}
              </FlexContainer>
              <DescriptionText>perceived exertion</DescriptionText>
            </ExertionRatingContainer>
          )}
        </ExercisesSectionHeading>
      </FlexContainer>
      <ExercisesContainer>
        {activityDetails.exercises.map((exercise, index) => {
          const exerciseMetrics = getExerciseMetrics(exercise)
          return (
            <div key={index}>
              <ExerciseName>
                {index + 1}. {exercise.exercise.name}{" "}
                {exercise.exercise.additionalInfo && (
                  <span>({exercise.exercise.additionalInfo})</span>
                )}
              </ExerciseName>
              <SetsTable>
                <thead>
                  <tr>
                    <th>#</th>
                    {exerciseMetrics.map((label, index) => (
                      <th key={index}>{label === "repeatCount" ? "set count" : label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}.</td>

                        {exerciseMetrics.map((item, index) => {
                          if (item === "duration") {
                            return (
                              <td key={index}>{set.duration && getDurationString(set.duration)}</td>
                            )
                          }
                          return <td key={index}>{set[item] || "-"}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </SetsTable>
            </div>
          )
        })}
      </ExercisesContainer>
    </>
  )
}
