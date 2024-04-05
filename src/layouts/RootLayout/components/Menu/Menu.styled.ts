import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"
import { ZIndex } from "@enums/zIndex.enum"

interface MenuWrapperProps {
  $isOpen: boolean
}

export const MenuWrapper = styled.nav<MenuWrapperProps>`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  padding: 64px 36px 44px 36px;

  position: absolute;
  z-index: ${ZIndex.MENU};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  height: 100%;

  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};

  transform: ${({ $isOpen }) => (!$isOpen ? `translateX(0)` : `translate(-100%)`)};

  transition: 0.3s ease-in-out;

  @media ${Breakpoints.SMALL} {
    width: 70%;
  }

  @media ${Breakpoints.MEDIUM} {
    padding: 24px 6px;
    position: static;
    width: 5%;
    transform: translateX(0);
  }

  @media ${Breakpoints.LARGE} {
    padding: 64px 32px 44px 32px;
    width: 15%;
  }
`

export const StyledButton = styled(Button)`
  margin-bottom: 6px;

  svg {
    min-width: 22px;
  }

  @media ${Breakpoints.MEDIUM} {
    justify-content: center;

    p {
      display: none;
    }
  }

  @media ${Breakpoints.LARGE} {
    justify-content: flex-start;

    p {
      display: block;
    }
  }
`

export const UserInfo = styled.div`
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  @media ${Breakpoints.MEDIUM} {
    display: none;
  }

  @media ${Breakpoints.LARGE} {
    display: block;
  }
`

export const UserImage = styled.img`
  background-color: ${({ theme }) => theme.backgroundColor};
  object-fit: cover;
  width: 52px;
  height: 52px;
  border-radius: 50%;

  margin-bottom: 16px;
  padding: 3px;

  border: 2px solid ${({ theme }) => theme.secondary};
`

export const UserName = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 6px;
`

export const UserEmail = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDisabled};
`

export const SettingsWrapper = styled(FlexContainer)`
  min-width: 250px;
  padding: 12px 12px 24px 12px;
  background-color: ${({ theme }) => theme.popoverBackgroundColor};
  border-radius: 9px;
`

export const SettingsOptions = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const ThemeSwitchWrapper = styled(FlexContainer)`
  padding: 0 12px;
  border-radius: 9px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
`
