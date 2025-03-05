import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled(FlexContainer)`
  height: 100%;
  width: 100%;

  .recharts-brush {
    tspan {
      font-size: 13px;
    }

    .recharts-brush-slide {
      fill-opacity: 0.1;
    }
  }
`
