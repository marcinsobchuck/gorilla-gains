import { useState } from "react"
import { useFormContext } from "react-hook-form"

import { Icon } from "@components/Icon/Icon"

import { PERCEIVED_EXERTION_DESCRIPTION, ratings } from "./constants"
import {
  ClearRating,
  ContentWrapper,
  Description,
  Label,
  RatingItem,
  RatingsWrapper,
  Wrapper,
} from "./ExertionRating.styled"

export const ExertionRating = () => {
  const [description, setDescription] = useState(PERCEIVED_EXERTION_DESCRIPTION)
  const [tempDescription, setTempDescription] = useState("")
  const [tempRating, setTempRating] = useState(0)
  const { register, setValue, getValues } = useFormContext()

  const currentRating = getValues("exertionRating")
  const isHovering = tempRating !== 0

  return (
    <Wrapper>
      <Label>
        Perceived exertion{" "}
        {currentRating > 0 && (
          <ClearRating
            onClick={() => {
              setValue("exertionRating", 0)
              setDescription(PERCEIVED_EXERTION_DESCRIPTION)
            }}
          >
            Clear entry
          </ClearRating>
        )}
      </Label>
      <ContentWrapper direction='column'>
        <RatingsWrapper>
          {ratings.map((rating, index) => {
            const isRatingActive = isHovering
              ? rating.value <= tempRating
              : rating.value <= currentRating
            return (
              <RatingItem
                key={index}
                direction='column'
                justify='center'
                align='center'
                $isActive={isRatingActive}
                onClick={() => {
                  setValue("exertionRating", rating.value)
                  setDescription(rating.description)
                }}
                onMouseOver={() => {
                  setTempRating(rating.value)
                  setTempDescription(rating.description)
                }}
                onMouseLeave={() => {
                  setTempRating(0)
                  setTempDescription("")
                }}
              >
                <Icon name='fire' width={46} height={46} />
                <p>{rating.text}</p>
              </RatingItem>
            )
          })}
        </RatingsWrapper>
        <Description>{isHovering ? tempDescription : description}</Description>
      </ContentWrapper>

      <input type='hidden' {...register("exertionRating", { valueAsNumber: true })} />
    </Wrapper>
  )
}
