import { format, parseISO } from "date-fns"
import { useTheme } from "styled-components"

import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"

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

  return (
    <>
      <HeadingContainer align='center'>
        <ActivityTypeBadge
          activityType={activityDetails.type.type}
          title={activityDetails.title}
          subtitle={format(parseISO(activityDetails.date), "LLLL d, y")}
          iconSize={32}
          titleSize={20}
        />
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
      </HeadingContainer>
      {activityDetails.notes && <Notes>{activityDetails.notes}</Notes>}
      <ExercisesSectionHeading>Exercises</ExercisesSectionHeading>
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
