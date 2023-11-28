import { useState } from "react"
import { Outlet } from "react-router-dom"

import { Logo } from "@components/Logo/Logo.tsx"
import { Modal } from "@components/Modal/Modal.tsx"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  return (
    <Background>
      <Modal
        isVisible={isActivityModalOpen}
        onCloseButtonClick={() => setIsActivityModalOpen((prev) => !prev)}
        title='Add activity'
      >
        Inputs
      </Modal>
      <Wrapper>
        <Header>
          <LeftSideWrapper>
            <Logo />
          </LeftSideWrapper>
          <RightSideWrapper>
            <StyledButton
              buttonType='button'
              variant='primary'
              icon='add'
              onClick={() => setIsActivityModalOpen((prev) => !prev)}
            >
              <p>Add activity</p>
            </StyledButton>

            <MenuIcon
              height={36}
              width={36}
              name='menu'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
          </RightSideWrapper>
        </Header>
        <FlexContainer>
          <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </Background>
  )
}
