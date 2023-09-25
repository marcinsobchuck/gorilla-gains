import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

interface Props {
  $variant: "primary" | "secondary"
  width?: number
}

const sharedStyles = (width?: number) => {
  return css`
    width: ${width && `${width}px`};
  `
}

const variants = {
  primary: css`
    display: block;
    padding: 16px 24px;
    border-radius: 54px;

    font-weight: 600;

    color: ${({ theme }) => theme.primaryButtonColor};
    background-color: ${({ theme }) => theme.secondary};
  `,
  secondary: css`
    display: inline;

    font-size: 14px;
    font-weight: 500;

    color: ${({ theme }) => theme.secondary};
    background-color: transparent;
  `,
}

export const StyledButton = styled.button<Props>`
  ${({ width }) => sharedStyles(width)};
  ${({ $variant }) => variants[$variant]}
`

export const StyledLink = styled(Link)<Props>`
  ${({ width }) => sharedStyles(width)};
  ${({ $variant }) => variants[$variant]}
`
