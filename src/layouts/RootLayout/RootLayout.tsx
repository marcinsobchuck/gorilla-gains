import { Outlet } from "react-router-dom"

import { Button } from "@components/Button/Button.tsx"
import { Logo } from "@components/Logo/Logo.tsx"
import { Background } from "@styles/GlobalStyle.ts"

import { Menu } from "./components/Menu.tsx"
import {
  FlexContainer,
  Header,
  LeftSideWrapper,
  RightSideWrapper,
  Wrapper,
} from "./RootLayout.styled.ts"

export const RootLayout = () => {
  return (
    <Background>
      <Wrapper>
        <Header>
          <LeftSideWrapper>
            <Logo />
          </LeftSideWrapper>
          <RightSideWrapper>
            <Button buttonType='button'>Create activity</Button>
          </RightSideWrapper>
        </Header>
        <FlexContainer>
          <Menu />
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </Background>
  )
}
