import styled from "styled-components"

interface LabelProps {
  $isFloating?: boolean
}

export const Label = styled.label<LabelProps>`
  font-size: ${({ $isFloating }) => ($isFloating ? `12px` : `14px`)};

  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme, $isFloating }) => ($isFloating ? theme.primaryDisabled : theme.primaryMedium)};
  transition: all 0.2s ease-out;
  position: absolute;
  z-index: 1;
  left: 26px;
  top: ${({ $isFloating }) => ($isFloating ? `6px` : `23px`)};
`
