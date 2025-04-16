import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { useAppDispatch } from "@app/hooks"
import gorillaPhoto from "@assets/gorillaPhoto.jpg"
import { Button } from "@components/Button/Button"
import { Popover } from "@components/Popover/Popover"
import { Switch } from "@components/Switch/Switch"
import { setActiveActivity, setIsActivityDetailsOpen } from "@features/activities/activitiesSlice"
import { logout } from "@features/auth/authSlice"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { listItems, settingsOptions } from "./config"
import {
  MenuWrapper,
  SettingsOptions,
  SettingsWrapper,
  StyledButton,
  ThemeSwitchWrapper,
  UserEmail,
  UserImage,
  UserInfo,
  UserName,
} from "./Menu.styled"
import { MenuProps } from "./Menu.types"

export const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const onLocationChange = useCallback(() => {
    dispatch(setIsActivityDetailsOpen(false))
    dispatch(setActiveActivity({}))
  }, [dispatch])

  const handleListItemClick = () => {
    setIsOpen(false)
    onLocationChange()
  }
  const handleSettingsItemClick = () => {
    setIsPopoverOpen(false)
    onLocationChange()
  }

  const handleLogoutButtonClick = () => {
    dispatch(logout())
    setIsPopoverOpen(false)
    onLocationChange()
  }

  const decodedToken = useJwtDecoded()

  const location = useLocation()

  useEffect(() => {
    onLocationChange()
  }, [dispatch, onLocationChange, location.pathname])

  return (
    <MenuWrapper $isOpen={isOpen}>
      <ul>
        {listItems.map((item) => (
          <StyledButton
            key={item.name}
            buttonType='navLink'
            to={item.path}
            onClick={handleListItemClick}
            icon={item.icon}
            variant='tertiary'
          >
            <p>{item.name}</p>
          </StyledButton>
        ))}
      </ul>
      <div>
        <UserInfo>
          <UserImage src={gorillaPhoto} alt='user avatar' />
          <UserName>{decodedToken?.name}</UserName>
          <UserEmail>{decodedToken?.email}</UserEmail>
        </UserInfo>
        <StyledButton
          ref={setAnchor}
          buttonType='button'
          variant='tertiary'
          icon='settings'
          onClick={() => setIsPopoverOpen((prev) => !prev)}
        >
          <p>Settings</p>
        </StyledButton>
        {anchor && isPopoverOpen && (
          <Popover
            anchor={anchor}
            onClickOutside={() => setIsPopoverOpen(false)}
            placement='right-end'
          >
            <SettingsWrapper direction='column' justify='space-between'>
              <SettingsOptions direction='column'>
                {settingsOptions.map((option) => (
                  <Button
                    key={option.name}
                    to={option.to}
                    buttonType='navLink'
                    variant='tertiary'
                    icon={option.icon}
                    onClick={handleSettingsItemClick}
                  >
                    {option.name}
                  </Button>
                ))}
                <ThemeSwitchWrapper align='center' justify='space-between'>
                  <p>Theme</p>
                  <Switch />
                </ThemeSwitchWrapper>
              </SettingsOptions>

              <Button
                buttonType='button'
                variant='tertiary'
                icon='logout'
                onClick={handleLogoutButtonClick}
              >
                Logout
              </Button>
            </SettingsWrapper>
          </Popover>
        )}
      </div>
    </MenuWrapper>
  )
}
