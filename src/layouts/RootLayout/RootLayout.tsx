import { useState } from "react"
import { Outlet } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks.ts"
import { Logo } from "@components/Logo/Logo.tsx"
import { Modal } from "@components/Modal/Modal.tsx"
import { setIsAddEditModalOpen, setIsEditing } from "@features/activities/activitiesSlice.ts"
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
  const [isPresetsVisible, setIsPresetsVisible] = useState(false)
  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  return (
    <Background>
      <Modal
        isVisible={state.isAddEditModalOpen}
        lockScroll={isPresetsVisible}
        onCloseButtonClick={() => {
          dispatch(setIsAddEditModalOpen(false))
          dispatch(setIsEditing(false))
          setIsPresetsVisible(false)
        }}
        title={state.isEditing ? "Edit activity" : "Add activity"}
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
              onClick={() => dispatch(setIsAddEditModalOpen(true))}
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
