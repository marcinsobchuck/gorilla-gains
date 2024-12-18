import styled from "styled-components"

import { Button } from "@components/Button/Button"

export const StyledForm = styled.form`
  padding: 48px;
`
export const FieldsWrapper = styled.div`
  max-width: 520px;
  margin: 0px auto;
`

export const SectionTitle = styled.h2`
  position: sticky;
  z-index: 2;
  top: 0px;
  font-weight: 700;
  font-size: 18px;
  padding: 24px;
  backdrop-filter: blur(3px);
`

export const SubmitButton = styled(Button)`
  margin: 24px auto;
`
