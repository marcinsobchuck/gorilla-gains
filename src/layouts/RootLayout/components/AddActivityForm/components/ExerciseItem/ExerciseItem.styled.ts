import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FormError } from "@components/FormError/FormError"

export const AddSetButton = styled(Button)`
  display: block;
  scroll-margin-bottom: 120px;
  margin: 0 auto;

  svg {
    margin: 0;
    width: 34px;
    height: 34px;
    fill: ${({ theme }) => theme.primaryMedium};
  }
`

export const SetsError = styled(FormError)`
  left: 50px;
  bottom: 7px;
`
