import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-template-rows: 120px repeat(2, 1fr);
  grid-gap: 5px;
  padding: 12px;
`
