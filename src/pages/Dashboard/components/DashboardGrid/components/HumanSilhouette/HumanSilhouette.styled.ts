import svg from "react-inlinesvg"
import styled from "styled-components"

export const HumanModelSVG = styled(svg)`
  width: 100%;
  height: 326px; // 326px

  * > * {
    stroke: none !important;
  }

  .other {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .head {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .eyes {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }
  .eyes-2 {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .ears {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .face {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .lips {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .neck,
  .backNeck {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .backHeadMuscle {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .backLats {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .shoulders,
  .backShoulders {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .traps {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .triceps {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }
  .biceps {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .forearm {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .hand {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .chest {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .abs {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .obliques {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .glutes {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .frontUpperLeg,
  .backUpperLeg {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .frontLowerLeg,
  .backLowerLeg,
  .calves {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }
  .foot {
    fill: ${({ theme }) => theme.secondaryOpacity};
  }

  .active-secondary {
    fill: ${({ theme }) => theme.secondaryMusclesColor};
  }

  .active-primary {
    fill: ${({ theme }) => theme.primaryMusclesColor};
  }
`

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`
