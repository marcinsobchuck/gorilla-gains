import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityTypeBadge } from "@components/ActivityTypeBadge/ActivityTypeBadge"
import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { toggleFavouriteExerciseAction } from "@features/exercises/exercisesActions"
import { setActiveExercise } from "@features/exercises/exercisesSlice"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import {
  BackButton,
  FavouriteExerciseInfo,
  HeadingWrapper,
  InfoItemWrapper,
  MusclesGroupWrapper,
  PrimaryMusclesText,
  SecondaryMusclesText,
  StyledHumanSilhouette,
  StyledSection,
} from "./ExerciseDetails.styled"
import { MuscleClassName, transformMuscleClassToText } from "./utils"
import { YoutubeVideoEmbed } from "./YoutubeVideoEmbed"

export const ExerciseDetails = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const activeExercise = useAppSelector((state) => state.exercises.activeExercise)
  const favouriteExercises = useAppSelector((state) => state.exercises.favouriteExercises)

  if (!activeExercise) return null

  const {
    activityType: { type },
    name,
    description,
    videoURL,
    musclesHit,
    _id: exerciseId,
  } = activeExercise

  const shouldDelete = favouriteExercises.find((ex) => ex._id === exerciseId)
  const operation = shouldDelete ? "delete" : "add"
  const shouldRenderHumanSilhouette = Object.entries(musclesHit).some(
    (entry) => entry[1].length > 0
  )

  return (
    <InfoItemWrapper>
      <BackButton
        variant='tertiary'
        buttonType='button'
        icon='leftArrow'
        iconColor={theme.secondary}
        onClick={() => dispatch(setActiveExercise(null))}
      />
      <HeadingWrapper justify='space-between' align='center'>
        <ActivityTypeBadge
          activityType={type}
          iconSize={32}
          title={name}
          subtitle={type}
          titleSize={24}
        />
        <FlexContainer direction='column' align='center'>
          <Button
            variant='tertiary'
            buttonType='button'
            icon='star'
            iconColor={theme.secondary}
            onClick={async () =>
              await dispatch(toggleFavouriteExerciseAction({ exerciseId, operation }))
            }
          >
            {shouldDelete ? "Delete from favourites" : "Add to favourites"}
          </Button>
          <FavouriteExerciseInfo>
            Favourite exercises will appear first when creating activity
          </FavouriteExerciseInfo>
        </FlexContainer>
      </HeadingWrapper>
      {shouldRenderHumanSilhouette && (
        <StyledSection>
          <h3>Muscle groups</h3>
          <FlexContainer gap={24} align='center'>
            <StyledHumanSilhouette musclesHit={musclesHit} withLegend={false} />

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
                      <MusclesGroupWrapper key={key}>
                        {key === "primary" ? (
                          <PrimaryMusclesText>{capitalizeFirstLetter(key)}</PrimaryMusclesText>
                        ) : (
                          <SecondaryMusclesText>{capitalizeFirstLetter(key)}</SecondaryMusclesText>
                        )}
                        <p>{transformedValues.join(", ")}</p>
                      </MusclesGroupWrapper>
                    )
                  })
                : "No data"}
            </div>
          </FlexContainer>
        </StyledSection>
      )}
      {description && (
        <StyledSection>
          <h3>Description</h3>
          <p>{description}</p>
        </StyledSection>
      )}

      {videoURL && (
        <StyledSection>
          <h3>Demo video</h3>
          <YoutubeVideoEmbed title={`${name} demonstration video`} url={videoURL} />
        </StyledSection>
      )}
    </InfoItemWrapper>
  )
}
