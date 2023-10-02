import { Outlet } from "react-router-dom"

import {
  FlexContainer,
  Header,
  LeftSideWrapper,
  Menu,
  MenuItem,
  MenuItemIcon,
  RightSideWrapper,
  Wrapper,
} from "./RootLayout.styled.ts"
import calendarIcon from "../assets/calendar.svg"
import dashboardIcon from "../assets/dashboard.svg"
import historyIcon from "../assets/history.svg"
import { Button } from "../components/Button/Button.tsx"
import { Logo } from "../components/Logo/Logo.tsx"
import { Background } from "../styles/GlobalStyle.ts"

export const RootLayout = () => {
  return (
    <Background>
      <Wrapper>
        <Header>
          <LeftSideWrapper>
            <Logo />
          </LeftSideWrapper>
          <RightSideWrapper>
            <Button buttonType='button' text='Create activity' />
          </RightSideWrapper>
        </Header>
        <FlexContainer>
          <Menu>
            <MenuItem>
              <MenuItemIcon src={dashboardIcon} /> Dashboard
            </MenuItem>
            <MenuItem>
              <MenuItemIcon src={historyIcon} /> History
            </MenuItem>
            <MenuItem>
              <MenuItemIcon src={calendarIcon} /> Calendar
            </MenuItem>
          </Menu>
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </Background>
  )
}
