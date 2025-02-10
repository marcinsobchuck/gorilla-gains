import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"
import { ZIndex } from "@enums/zIndex.enum"

interface SidebarProps {
  $padding?: string
}

export const Wrapper = styled.div`
  height: 100vh;
`

export const Header = styled.header`
  position: sticky;
  z-index: ${ZIndex.HEADER};
  display: flex;
  height: var(--header-height);
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
`

export const LeftSideWrapper = styled.div`
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};

  @media ${Breakpoints.MEDIUM} {
    justify-content: flex-start;

    width: 36%;
    padding-left: 32px;
  }
`

export const RightSideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 16px;

  @media ${Breakpoints.MEDIUM} {
    padding-right: 32px;
    justify-content: flex-end;
  }
`
export const MainContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: calc(100vh - var(--header-height));

  @media ${Breakpoints.MEDIUM} {
    flex-direction: row;
  }
`

export const Sidebar = styled.aside<SidebarProps>`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  padding: ${({ $padding }) => ($padding ? $padding : "24px 14px")};

  h1 {
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
    padding-left: 10px;

    @media ${Breakpoints.LARGE} {
      font-size: 24px;
    }
  }

  @media ${Breakpoints.MEDIUM} {
    width: var(--sidebar-width-m);
    padding: ${({ $padding }) => ($padding ? $padding : "24px")};
  }

  @media ${Breakpoints.LARGE} {
    width: var(--sidebar-width-l);
  }
`
export const MainContentWrapper = styled.main`
  overflow: hidden;
  position: relative;
  flex-grow: 1;

  @media ${Breakpoints.MEDIUM} {
    flex-grow: 0;
    width: calc(100% - var(--sidebar-width-m) - var(--menu-width-m));
  }
  @media ${Breakpoints.LARGE} {
    width: calc(100% - var(--sidebar-width-l) - var(--menu-width-l));
  }
`

export const MenuIcon = styled(Icon)`
  fill: ${({ theme }) => theme.primaryMedium};

  cursor: pointer;

  @media ${Breakpoints.MEDIUM} {
    display: none;
  }
`

export const StyledButton = styled(Button)`
  padding: 0;

  p {
    display: none;
  }
  svg {
    width: 46px;
    height: 46px;
    fill: ${({ theme }) => theme.backgroundColor};
  }

  @media ${Breakpoints.SMALL} {
    padding: 16px 24px;

    p {
      display: block;
      color: ${({ theme }) => theme.backgroundColor};
    }
    svg {
      display: none;
    }
  }
`
