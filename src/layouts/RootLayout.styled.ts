import svg from "react-inlinesvg"
import styled from "styled-components"

const headerHeight = "84px"

export const Wrapper = styled.div`
  height: 100vh;
`

export const Header = styled.header`
  display: flex;
  height: 84px;

  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding-left: 32px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  flex-basis: 36%;
`

export const RightSideWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;

  padding-right: 24px;
`

export const Menu = styled.nav`
  padding: 64px 0px 24px 32px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  flex-basis: 15%;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  height: calc(100vh - ${headerHeight});
`

export const MenuItem = styled.li`
  font-size: 14px;
  margin-bottom: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`
export const MenuItemIcon = styled(svg)`
  display: inline-block;
  margin-right: 9px;
  width: 18px;
  height: 18px;
  fill: ${({ theme }) => theme.primaryDisabled};
`

export const FlexContainer = styled.div`
  display: flex;
`
export const Sidebar = styled.aside`
  flex-basis: 21%;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
`
export const MainContentWrapper = styled.main`
  flex-grow: 1;
`
