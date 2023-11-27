import { useState } from "react"
import { Outlet } from "react-router-dom"

import { Logo } from "@components/Logo/Logo.tsx"
import { Background } from "@styles/GlobalStyle.ts"

import { Menu } from "./components/Menu.tsx"
import {
  FlexContainer,
  Header,
  LeftSideWrapper,
  MenuIcon,
  RightSideWrapper,
  StyledButton,
  Wrapper,
} from "./RootLayout.styled.ts"

export const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Background>
      <Wrapper>
        <Header>
          <LeftSideWrapper>
            <Logo />
          </LeftSideWrapper>
          <RightSideWrapper>
            <StyledButton buttonType='button' variant='primary' icon='add'>
              <p>Add activity</p>
            </StyledButton>

            <MenuIcon
              height={36}
              width={36}
              name='menu'
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </RightSideWrapper>
        </Header>
        <FlexContainer>
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </Background>
  )
}
