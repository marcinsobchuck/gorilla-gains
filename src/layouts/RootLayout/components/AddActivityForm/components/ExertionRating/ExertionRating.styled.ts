import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  padding: 6px 24px 16px 24px;
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;
  margin-top: 28px;
`

export const ContentWrapper = styled(FlexContainer)`
  padding: 12px 0;
  gap: 24px;

  @media ${Breakpoints.SMALL} {
    flex-direction: row;
  }
`

export const RatingsWrapper = styled(FlexContainer)``

export const ClearRating = styled.span`
  margin-left: 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.secondary};
  text-underline-offset: 3px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const Label = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 14px;
  text-transform: uppercase;
`

export const RatingItem = styled(FlexContainer)<{ $isActive: boolean }>`
  cursor: pointer;
  gap: 6px;
  width: 70px;
  height: 70px;
  svg {
    transition: all 0.3s;
    fill: ${({ $isActive, theme }) => ($isActive ? theme.secondary : theme.primaryDisabled)};
    &:hover {
      transform: scale(1.1);
    }
  }
  p {
    font-size: 12px;
  }

  &:active {
    svg {
      fill: ${({ theme }) => theme.secondaryActive};
    }
  }
`

export const Description = styled.div`
  font-size: 12px;
`
