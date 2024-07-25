import { format, parseISO } from "date-fns"
import { useTheme } from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { IconContainer } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard.styled"
import { getIconNamePerActivityType } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/utils"

import {
  ActivityDate,
  DescriptionText,
  ExerciseContainer,
  ExerciseName,
  ExercisesContainer,
  ExercisesSectionHeading,
  ExertionRatingContainer,
  Notes,
  SetsTable,
  Title,
  TitleDateContainer,
} from "./ActivityDetails.styled"
import { ActivityDetailsProps } from "./ActivityDetails.types"
import { getDurationString, getExerciseMetrics } from "./utils"

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activityDetails }) => {
  const theme = useTheme()
  return (
    <>
      <FlexContainer align='center'>
        <IconContainer align='center' justify='center'>
          <Icon
            name={getIconNamePerActivityType(activityDetails.type.type)}
            width={22}
            height={22}
            color={theme.secondary}
          />
        </IconContainer>
        <TitleDateContainer>
          <Title>{activityDetails.title}</Title>
          <ActivityDate>{format(parseISO(activityDetails.date), "LLLL d, y")}</ActivityDate>
        </TitleDateContainer>

        <ExertionRatingContainer direction='column'>
          <FlexContainer justify='center'>
            {Array.from({ length: activityDetails.exertionRating || 0 }).map((_, index) => (
              <Icon key={index} name='fire' color={theme.secondary} width={22} height={22} />
            ))}
          </FlexContainer>
          <DescriptionText>perceived exertion</DescriptionText>
        </ExertionRatingContainer>
      </FlexContainer>
      {activityDetails.notes && <Notes>{activityDetails.notes}</Notes>}
      <ExercisesSectionHeading>Exercises</ExercisesSectionHeading>
      <ExercisesContainer>
        {activityDetails.exercises.map((exercise, index) => {
          const exerciseMetrics = getExerciseMetrics(exercise)
          return (
            <ExerciseContainer key={index}>
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
                      <th key={index}>{label}</th>
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
            </ExerciseContainer>
          )
        })}
      </ExercisesContainer>
    </>
  )
}
