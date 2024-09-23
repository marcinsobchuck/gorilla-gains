import { RefObject, forwardRef } from "react"
import { LinkProps } from "react-router-dom"

import { StyledButton, StyledLink, StyledNavLink } from "./Button.styled"
import { ButtonProps } from "./Button.types"
import { Icon } from "../Icon/Icon"

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { buttonType, variant = "primary", width, children, icon, textColor, iconColor, ...rest },
    ref
  ) => {
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
          ref={ref as RefObject<HTMLAnchorElement>}
        >
          {children}
          {icon && <Icon name={icon} color={iconColor} />}
        </StyledLink>
      )
    }

    if (buttonType === "navLink") {
      return (
        <StyledNavLink
          {...sharedProps}
          {...(rest as LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as RefObject<HTMLAnchorElement>}
        >
          {children}
          {icon && <Icon name={icon} color={iconColor} />}
        </StyledNavLink>
      )
    }

    return (
      <StyledButton
        {...sharedProps}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as RefObject<HTMLButtonElement>}
      >
        {children}
        {icon && <Icon name={icon} color={iconColor} />}
      </StyledButton>
    )
  }
)
