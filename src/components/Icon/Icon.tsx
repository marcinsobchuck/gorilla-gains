import add from "@assets/add.svg"
import calendar from "@assets/calendar.svg"
import close from "@assets/close.svg"
import dashboard from "@assets/dashboard.svg"
import error from "@assets/error.svg"
import github from "@assets/github.svg"
import gorilla from "@assets/gorilla.svg"
import history from "@assets/history.svg"
import linkedin from "@assets/linkedin.svg"
import menu from "@assets/menu.svg"
import moon from "@assets/moon.svg"
import settings from "@assets/settings.svg"
import success from "@assets/success.svg"
import sun from "@assets/sun.svg"

import { StyledIcon } from "./Icon.styled"
import { IconName, IconProps } from "./Icon.types"

export const Icon: React.FC<IconProps> = ({ name, width, height, ...rest }) => {
  const SVGProps = {
    width,
    height,
    ...rest,
  }

  const icons: Record<IconName, React.ReactNode> = {
    calendar: <StyledIcon src={calendar} {...SVGProps} />,
    dashboard: <StyledIcon src={dashboard} {...SVGProps} />,
    error: <StyledIcon src={error} {...SVGProps} />,
    github: <StyledIcon src={github} {...SVGProps} />,
    gorilla: <StyledIcon src={gorilla} {...SVGProps} />,
    history: <StyledIcon src={history} {...SVGProps} />,
    linkedin: <StyledIcon src={linkedin} {...SVGProps} />,
    moon: <StyledIcon src={moon} {...SVGProps} />,
    settings: <StyledIcon src={settings} {...SVGProps} />,
    success: <StyledIcon src={success} {...SVGProps} />,
    sun: <StyledIcon src={sun} {...SVGProps} />,
    menu: <StyledIcon src={menu} {...SVGProps} />,
    add: <StyledIcon src={add} {...SVGProps} />,
    close: <StyledIcon src={close} {...SVGProps} />,
  }

  if (name) {
    return icons[name]
  }

  return null
}
