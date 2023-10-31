import { LinkProps } from "react-router-dom"

import { StyledButton, StyledLink, StyledNavLink } from "./Button.styled"
import { ButtonProps } from "./Button.types"
import { Icon } from "../Icon/Icon"

export const Button: React.FC<ButtonProps> = ({
  buttonType,
  variant = "primary",
  width,
  children,
  icon,
  textColor,
  ...rest
}) => {
  const sharedProps = {
    $variant: variant,
    width,
    $textColor: textColor,
  }

  if (buttonType === "link") {
    return (
      <StyledLink
        {...sharedProps}
        {...(rest as LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <Icon name={icon} />
        {children}
      </StyledLink>
    )
  }

  if (buttonType === "navLink") {
    return (
      <StyledNavLink
        {...sharedProps}
        {...(rest as LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <Icon name={icon} />
        {children}
      </StyledNavLink>
    )
  }

  return (
    <StyledButton {...sharedProps} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      <Icon name={icon} />
      {children}
    </StyledButton>
  )
}
