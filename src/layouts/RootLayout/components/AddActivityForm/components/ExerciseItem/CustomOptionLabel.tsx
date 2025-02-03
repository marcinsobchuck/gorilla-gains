import React from "react"
import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

import { ExerciseFields } from "../../AddActivityForm.types"

interface CustomOptionLabelProps {
  data: AsyncOption
}

const AdditionalInfo = styled.p`
  margin-left: 9px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
`

export const CustomOptionLabel: React.FC<CustomOptionLabelProps> = ({ data }) => {
  const { label, additionalInfo } = data as ExerciseFields

  return (
    <FlexContainer align='center'>
      <FlexContainer align='center'>
        {label}

        <AdditionalInfo>{additionalInfo && `(${additionalInfo})`}</AdditionalInfo>
      </FlexContainer>
      {data.isFavourite ? <Icon name='star' color='gold' /> : null}
    </FlexContainer>
  )
}
