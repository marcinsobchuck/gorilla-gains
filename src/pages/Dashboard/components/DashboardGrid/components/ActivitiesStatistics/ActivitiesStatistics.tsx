import { Activity } from "@api/types/activitiesService.types"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import {
  CardsWrapper,
  LastActivityWrapper,
  StyledActivityCard,
} from "./ActivitiesStatistics.styled"
import { BasicCard } from "../BasicCard/BasicCard"

const xd = {
  _id: "666837edd69bd9104060216c",
  title: "Endurance - 27/06/2024",
  type: {
    _id: "65fc717698898a9e7ef3b1a2",
    type: "endurance",
    __v: 0,
  },
  date: "2024-06-26T22:00:00.000Z",
  exercises: [
    {
      exercise: {
        _id: "66142eac82d34f54c387f65a",
        activityType: "65fc717698898a9e7ef3b1a2",
        name: "Walking",
        additionalInfo: "pace: >12:00 min/km, speed: <5 km/h",
        __v: 0,
      },
      sets: [
        {
          duration: {
            hours: 12,
            minutes: 3,
            seconds: 45,
          },
          distance: 100,
        },
      ],
      withBreaks: false,
    },
    {
      exercise: {
        _id: "660170249d36159744c89604",
        activityType: "65fc717698898a9e7ef3b1a2",
        name: "Swim - crawl",
        __v: 0,
      },
      sets: [
        {
          duration: {
            seconds: 45,
          },
          distance: 5,
        },
      ],
      withBreaks: false,
    },
  ],
  notes: "BASDASDAS",
  warmup: false,
  repeatExercisesCount: 1,
  exertionRating: 4,
  createdAt: "2024-06-11T11:41:33.561Z",
  updatedAt: "2024-06-14T16:48:06.694Z",
  __v: 0,
  isPreset: true,
  estimatedDuration: 43470,
}
export const ActivitiesStatistics = () => {
  return (
    <FlexContainer direction='column' gap={12}>
      <LastActivityWrapper direction='column'>
        <h2>Last activity past 7 days</h2>
        <StyledActivityCard data={xd as unknown as Activity} popoverOptions={[]} />
      </LastActivityWrapper>
      <CardsWrapper gap={12}>
        <BasicCard value='3' label='Days since last activity' withTooltip={false} />
        <BasicCard value='236' label='Overall activities done' withTooltip={false} />
        <BasicCard value='3' label='Avg. activities/week' withTooltip={false} />
        <BasicCard value='Pull up' label='Most common exercise' withTooltip={false} />
      </CardsWrapper>
    </FlexContainer>
  )
}
