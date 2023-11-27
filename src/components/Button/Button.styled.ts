import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

import { Variant } from "./Button.types"

interface Props {
  $variant: Variant
  width?: number
  $textColor?: string
}

const sharedStyles = (width?: number, textColor?: string) => {
  return css`
    width: ${width && `${width}px`};
    color: ${textColor && textColor};
    transition: background-color 0.3s;

    svg {
      transition: fill 0.3s;
    }

    cursor: pointer;
  `
}

const variants = {
  primary: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 16px 24px;
    border-radius: 54px;

    font-weight: 600;
    gap: 6px;

    color: ${({ theme }) => theme.primaryButtonColor};
    background-color: ${({ theme }) => theme.secondary};

    &:hover {
      background-color: ${({ theme }) => theme.secondaryHover};
    }

    &:active {
      background-color: ${({ theme }) => theme.secondaryActive};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.secondaryDisabled};
      cursor: not-allowed;
    }
  `,
  secondary: css`
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;

    color: ${({ theme }) => theme.secondaryText};
    background-color: transparent;

    svg {
      margin-right: 12px;
    }
  `,
  tertiary: css`
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: transparent;

    gap: 12px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 600;

    color: ${({ theme }) => theme.primary};

    &[class*="active"] {
      p {
        color: ${({ theme }) => theme.secondaryText};
      }

      svg {
        fill: ${({ theme }) => theme.secondaryText};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.secondaryOpacity};
    }
  `,
}

export const StyledButton = styled.button<Props>`
  ${({ $variant }) => variants[$variant]}
  ${({ width, $textColor }) => sharedStyles(width, $textColor)};
`

export const StyledLink = styled(Link)<Props>`
  ${({ $variant }) => variants[$variant]}
  ${({ width, $textColor }) => sharedStyles(width, $textColor)};
`

export const StyledNavLink = styled(NavLink)<Props>`
  ${({ $variant }) => variants[$variant]}
  ${({ width, $textColor }) => sharedStyles(width, $textColor)};
`
