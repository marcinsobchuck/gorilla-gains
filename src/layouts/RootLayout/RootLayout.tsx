import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { setUpResponseInterceptor } from "@api/api.ts"
import { useAppDispatch, useAppSelector } from "@app/hooks.ts"
import { ActivityDetailsContainer } from "@components/ActivityDetailsContainer/ActivityDetailsContainer.tsx"
import { Logo } from "@components/Logo/Logo.tsx"
import { Modal } from "@components/Modal/Modal.tsx"
import { deleteActivityAction } from "@features/activities/activitiesActions.ts"
import {
  setActiveActivity,
  setCurrentlyEditedActivity,
  setIsActivityDetailsOpen,
  setIsAddEditModalOpen,
  setIsEditing,
} from "@features/activities/activitiesSlice.ts"
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
  const activeActivity = useAppSelector((state) => state.activities.activeActivity)
  const isActivityDetailsOpen = useAppSelector((state) => state.activities.isActivityDetailsOpen)
  const isActivityPresetsVisible = useAppSelector(
    (state) => state.activityPresets.isActivityPresetsVisible
  )
  const isAddEditModalOpen = useAppSelector((state) => state.activities.isAddEditModalOpen)
  const isEditing = useAppSelector((state) => state.activities.isEditing)
  const dispatch = useAppDispatch()

  const handleEditActivity = () => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activeActivity))
  }

  const handleRemoveActivity = async () => {
    if (activeActivity) {
      await dispatch(deleteActivityAction(activeActivity._id))

      dispatch(setIsActivityDetailsOpen(false))
      dispatch(setActiveActivity({}))
    }
  }

  const handleOnClose = () => {
    dispatch(setIsActivityDetailsOpen(false))
    dispatch(setActiveActivity({}))
  }

  return (
    <Background>
      <ToastContainer />

      <Modal
        id='add-activity-modal'
        isVisible={isAddEditModalOpen}
        scrollToTop={isActivityPresetsVisible}
        onCloseButtonClick={() => {
          dispatch(setIsAddEditModalOpen(false))
          dispatch(setIsEditing(false))
          dispatch(setIsActivityPresetsVisible(false))
        }}
        title={isEditing ? "Edit activity" : "Add activity"}
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
          <ActivityDetailsContainer
            isOpen={isActivityDetailsOpen}
            onClose={handleOnClose}
            onEdit={handleEditActivity}
            onRemove={handleRemoveActivity}
            activeActivityEvent={activeActivity}
          />
          <Outlet />
        </MainContainer>
      </Wrapper>
    </Background>
  )
}
