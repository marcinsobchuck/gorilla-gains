import { useState } from "react"

import { useAppDispatch } from "@app/hooks"
import gorillaPhoto from "@assets/gorillaPhoto.jpg"
import { Button } from "@components/Button/Button"
import { IconName } from "@components/Icon/Icon.types"
import { Popover } from "@components/Popover/Popover"
import { Switch } from "@components/Switch/Switch"
import { Routes } from "@enums/routes.enum"
import { logout } from "@features/auth/authSlice"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { listItems } from "./config"
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

interface SettingOption {
  icon: IconName
  name: string
  to: string
}

const settingsOptions: SettingOption[] = [
  {
    icon: "account",
    name: "Account",
    to: `${Routes.SETTINGS}#account-information-section`,
  },
  {
    icon: "privacy",
    name: "Privacy",
    to: `${Routes.SETTINGS}#user-settings-section`,
  },
]

export const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const decodedToken = useJwtDecoded()

  return (
    <MenuWrapper $isOpen={isOpen}>
      <ul>
        {listItems.map((item) => (
          <StyledButton
            key={item.name}
            buttonType='navLink'
            to={item.path}
            onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsPopoverOpen(false)}
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
                onClick={() => {
                  dispatch(logout())
                  setIsPopoverOpen(false)
                }}
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
