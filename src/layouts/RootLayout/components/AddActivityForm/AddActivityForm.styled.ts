import styled from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Select } from "@components/Select/Select"

export const StyledSelect = styled(Select)`
  margin-bottom: 24px;
`

export const StyledRemoveIcon = styled(Icon)`
  fill: ${({ theme }) => theme.secondary};
`
