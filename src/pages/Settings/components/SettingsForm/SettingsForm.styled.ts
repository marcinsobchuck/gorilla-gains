import styled from "styled-components"

export const StyledForm = styled.form`
  padding: 48px;
`
export const FieldsWrapper = styled.div`
  max-width: 520px;
  margin: 0px auto;
`

export const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  padding: 12px;
`
export const SubsectionTitle = styled.h3`
  color: ${({ theme }) => theme.primaryMedium};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 18px;
`
export const SubsectionWrapper = styled.div`
  padding: 24px 0;
`
