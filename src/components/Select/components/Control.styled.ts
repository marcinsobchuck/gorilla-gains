import styled from "styled-components"

interface LabelProps {
  $isFloating?: boolean
  $isEmpty?: boolean
}

export const Label = styled.label<LabelProps>`
  font-size: ${({ $isFloating }) => ($isFloating ? `12px` : `14px`)};

  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme, $isEmpty }) => (!$isEmpty ? theme.primaryMedium : theme.primaryDisabled)};
  transition: all 0.2s ease-out;
  position: absolute;
  z-index: 1;
  left: 26px;
  top: ${({ $isFloating }) => ($isFloating ? `6px` : `23px`)};
`
