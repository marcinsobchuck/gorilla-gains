import { useState } from "react"
import { Outlet } from "react-router-dom"

import { Logo } from "@components/Logo/Logo.tsx"
import { Modal } from "@components/Modal/Modal.tsx"
import { Background } from "@styles/GlobalStyle.ts"

import { AddActivityForm } from "./components/AddActivityForm/AddActivityForm.tsx"
import { Menu } from "./components/Menu/Menu.tsx"
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
  const [isPresetsVisible, setIsPresetsVisible] = useState(false)

  return (
    <Background>
      <Modal
        isVisible={isActivityModalOpen}
        lockScroll={isPresetsVisible}
        onCloseButtonClick={() => {
          setIsActivityModalOpen((prev) => !prev)
          setIsPresetsVisible(false)
        }}
        title='Add activity'
      >
        <AddActivityForm
          isPresetsVisible={isPresetsVisible}
          setIsPresetsVisible={setIsPresetsVisible}
        />
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
