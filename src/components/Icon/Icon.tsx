import add from "@assets/add.svg"
import balance from "@assets/balance.svg"
import calendar from "@assets/calendar.svg"
import checkmark from "@assets/checkmark.svg"
import close from "@assets/close.svg"
import dashboard from "@assets/dashboard.svg"
import endurance from "@assets/endurance.svg"
import error from "@assets/error.svg"
import fire from "@assets/fireIcon.svg"
import flexibility from "@assets/flexibility.svg"
import github from "@assets/github.svg"
import gorilla from "@assets/gorilla.svg"
import history from "@assets/history.svg"
import leftArrow from "@assets/leftArrow.svg"
import linkedin from "@assets/linkedin.svg"
import menu from "@assets/menu.svg"
import minus from "@assets/minus.svg"
import moon from "@assets/moon.svg"
import remove from "@assets/remove.svg"
import settings from "@assets/settings.svg"
import strength from "@assets/strength.svg"
import success from "@assets/success.svg"
import sun from "@assets/sun.svg"
import threeDots from "@assets/threeDots.svg"

import { StyledIcon } from "./Icon.styled"
import { IconName, IconProps } from "./Icon.types"

export const Icon: React.FC<IconProps> = ({ name, width, height, color, ...rest }) => {
  const SVGProps = {
    width,
    height,
    color,
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
    remove: <StyledIcon src={remove} {...SVGProps} />,
    checkmark: <StyledIcon src={checkmark} {...SVGProps} />,
    minus: <StyledIcon src={minus} {...SVGProps} />,
    fire: <StyledIcon src={fire} {...SVGProps} />,
    leftArrow: <StyledIcon src={leftArrow} {...SVGProps} />,
    threeDots: <StyledIcon src={threeDots} {...SVGProps} />,
    strength: <StyledIcon src={strength} {...SVGProps} />,
    endurance: <StyledIcon src={endurance} {...SVGProps} />,
    flexibility: <StyledIcon src={flexibility} {...SVGProps} />,
    balance: <StyledIcon src={balance} {...SVGProps} />,
  }

  if (name) {
    return icons[name]
  }

  return null
}
