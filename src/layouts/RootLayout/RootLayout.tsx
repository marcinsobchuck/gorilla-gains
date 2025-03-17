import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { setUpResponseInterceptor } from "@api/api.ts"
import { useAppDispatch, useAppSelector } from "@app/hooks.ts"
import { Logo } from "@components/Logo/Logo.tsx"
import { Modal } from "@components/Modal/Modal.tsx"
import { setIsAddEditModalOpen, setIsEditing } from "@features/activities/activitiesSlice.ts"
import { setIsActivityPresetsVisible } from "@features/activityPresets/activityPresetsSlice.ts"
import { Background } from "@styles/GlobalStyle.ts"

import { AddActivityForm } from "./components/AddActivityForm/AddActivityForm.tsx"
import { Menu } from "./components/Menu/Menu.tsx"
import {
  Header,
  LeftSideWrapper,
  MainContainer,
  MenuIcon,
  RightSideWrapper,
  StyledButton,
  Wrapper,
} from "./RootLayout.styled.ts"

export const RootLayout = () => {
  const navigate = useNavigate()
  setUpResponseInterceptor(navigate)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isActivityPresetsVisible = useAppSelector(
    (state) => state.activityPresets.isActivityPresetsVisible
  )
  const state = useAppSelector((state) => state.activities)
  const dispatch = useAppDispatch()

  return (
    <Background>
      <ToastContainer />
      <Modal
        isVisible={state.isAddEditModalOpen}
        lockScroll={isActivityPresetsVisible}
        onCloseButtonClick={() => {
          dispatch(setIsAddEditModalOpen(false))
          dispatch(setIsEditing(false))
          dispatch(setIsActivityPresetsVisible(false))
        }}
        title={state.isEditing ? "Edit activity" : "Add activity"}
      >
        <AddActivityForm />
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
        <MainContainer>
          <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <Outlet />
        </MainContainer>
      </Wrapper>
    </Background>
  )
}
