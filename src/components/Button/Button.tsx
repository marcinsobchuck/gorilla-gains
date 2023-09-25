import React from "react"
import { LinkProps } from "react-router-dom"

import { StyledButton, StyledLink } from "./Button.styled"
import { ButtonProps } from "./Button.types"

export const Button: React.FC<ButtonProps> = ({
  buttonType = "button",
  variant = "primary",
  width,
  text,
  ...rest
}) => {
  const sharedProps = {
    $variant: variant,
    width,
  }

  if (buttonType === "link") {
    return (
      <StyledLink
        {...sharedProps}
        {...(rest as LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {text}
      </StyledLink>
    )
  }

  return (
    <StyledButton {...sharedProps} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {text}
    </StyledButton>
  )
}
