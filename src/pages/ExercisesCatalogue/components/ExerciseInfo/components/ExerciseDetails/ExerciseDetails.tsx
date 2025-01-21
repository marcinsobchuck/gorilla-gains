import { useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { StyledSection } from "./ExerciseDetails.styled"
import { MuscleClassName, transformMuscleClassToText } from "./utils"
import { YoutubeVideoEmbed } from "./YoutubeVideoEmbed"

export const ExerciseDetails = () => {
  const activeExercise = useAppSelector((state) => state.exercises.activeExercise)

  if (!activeExercise) return null

  const {
    activityType: { type },
    name,
    description,
    videoURL,
    musclesHit,
  } = activeExercise

  return (
    <div>
      <ActivityTypeBadge
        activityType={type}
        iconSize={32}
        title={name}
        subtitle={type}
        titleSize={24}
      />
      <StyledSection>
        <h3>Description</h3>
        <p>{description}</p>
      </StyledSection>
      <StyledSection>
        <h3>Demo video</h3>
        {videoURL && <YoutubeVideoEmbed title={`${name} demonstration video`} url={videoURL} />}
      </StyledSection>
      <StyledSection>
        <h3>Muscle groups</h3>
        <div>
          {musclesHit
            ? Object.entries(musclesHit).map(([key, value]) => {
                if (value.length < 0) {
                  return null
                }
                const transformedValues = [
                  ...new Set(
                    value.map((className) =>
                      transformMuscleClassToText(className as MuscleClassName)
                    )
                  ),
                ]
                return (
                  <div key={key}>
                    <p>
                      {capitalizeFirstLetter(key)}: {transformedValues.join(", ")}
                    </p>
                  </div>
                )
              })
            : "No data"}
        </div>
      </StyledSection>
    </div>
  )
}
