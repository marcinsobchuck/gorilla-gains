import svg from "react-inlinesvg"
import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const HumanModelSVG = styled(svg)`
  max-height: 352px;

  * > * {
    stroke: none !important;
  }

  .other {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .head {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .eyes {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }
  .eyes-2 {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .ears {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .face {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .lips {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .neck,
  .backNeck {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .backHeadMuscle {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .backLats {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .lowerBack {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .shoulders,
  .backShoulders {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .traps {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .triceps {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }
  .biceps {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .forearm {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .hand {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .chest {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .abs {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .obliques {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .glutes {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .frontUpperLeg,
  .backUpperLeg {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .frontLowerLeg,
  .backLowerLeg,
  .calves {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .foot {
    fill: ${({ theme }) => theme.otherMusclesColor};
  }

  .active-secondary {
    fill: ${({ theme }) => theme.secondaryMusclesColor};
  }

  .active-primary {
    fill: ${({ theme }) => theme.primaryMusclesColor};
  }
`

export const Title = styled.h2`
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`

export const LegendWrapper = styled(FlexContainer)`
  margin-top: 12px;
`

export const LegendDot = styled.div<{ $color: string }>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  margin-right: 6px;
`

export const LegendItem = styled(FlexContainer)``
export const LegendText = styled.p<{ $color: string }>`
  font-size: 12px;
  color: ${({ $color }) => $color};
`
