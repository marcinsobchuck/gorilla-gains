import styled, { css } from "styled-components"

import { Icon } from "../Icon/Icon"

interface Props {
  $currentTheme: string
}

export const SwitchWrapper = styled.button<Props>`
  display: flex;
  position: relative;
  align-items: center;
  width: 68px;
  height: 28px;
  background-color: transparent;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primaryDisabled};
    transition: 0.3s;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    transform: translate(100%);
    transition: 0.3s;

    ${({ $currentTheme, theme }) =>
      $currentTheme === "light" &&
      css`
        background-color: ${theme.secondary};
        transform: translate(0);
      `}
  }

  svg {
    fill: ${({ $currentTheme, theme }) =>
      $currentTheme === "light" ? theme.primaryDisabled : theme.primary};
  }

  svg:first-of-type {
    fill: ${({ $currentTheme, theme }) =>
      $currentTheme === "light" ? theme.primary : theme.primaryDisabled};
  }
`

export const StyledIcon = styled(Icon)`
  margin-bottom: 2px;
  flex-basis: 50%;
`
