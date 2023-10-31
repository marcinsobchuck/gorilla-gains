import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Breakpoints } from "@enums/breakpoints.enum"

export const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  padding: 64px 36px 44px 36px;

  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  height: 100%;

  background-color: ${({ theme }) => theme.navBackgroundColor};

  @media ${Breakpoints.SMALL} {
    width: 70%;
  }

  @media ${Breakpoints.MEDIUM} {
    padding: 24px 6px;
    position: static;
    width: 5%;
  }

  @media ${Breakpoints.LARGE} {
    padding: 64px 32px 44px 32px;
    border-right: 1px solid ${({ theme }) => theme.borderColor};
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

export const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.primaryMedium};
  }
`
