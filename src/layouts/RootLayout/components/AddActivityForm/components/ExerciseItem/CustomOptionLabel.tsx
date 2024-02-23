import React from "react"
import styled from "styled-components"

import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

import { ExerciseFields } from "../../AddActivityForm.types"

interface CustomOptionLabelProps {
  data: AsyncOption
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const AdditionalInfo = styled.p`
  margin-left: 9px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
`

export const CustomOptionLabel: React.FC<CustomOptionLabelProps> = ({ data }) => {
  const { label, additionalInfo } = data as ExerciseFields

  return (
    <Wrapper>
      <div>{label}</div>
      <AdditionalInfo>{additionalInfo && `(${additionalInfo})`}</AdditionalInfo>
    </Wrapper>
  )
}
