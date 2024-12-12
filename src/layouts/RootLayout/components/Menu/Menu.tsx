import { useState } from "react"

import gorillaPhoto from "@assets/gorillaPhoto.jpg"
import { Button } from "@components/Button/Button"
import { IconName } from "@components/Icon/Icon.types"
import { Popover } from "@components/Popover/Popover"
import { Switch } from "@components/Switch/Switch"
import { Routes } from "@enums/routes.enum"
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
import { ListItem, MenuProps } from "./Menu.types"

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
  {
    icon: "logout",
    name: "Logout",
    to: "",
  },
]

export const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const [, setCurrentItem] = useState<ListItem>(listItems[0])

  const decodedToken = useJwtDecoded()

  const handleItemClick = (item: ListItem) => {
    setCurrentItem(item)
    setIsOpen(true)
  }

  return (
    <MenuWrapper $isOpen={isOpen}>
      <ul>
        {listItems.map((item) => (
          <StyledButton
            key={item.name}
            buttonType='navLink'
            to={item.path}
            onClick={() => handleItemClick(item)}
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
              <SettingsOptions>
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
              </SettingsOptions>
              <ThemeSwitchWrapper align='center' justify='space-between'>
                <p>Theme</p>
                <Switch />
              </ThemeSwitchWrapper>
            </SettingsWrapper>
          </Popover>
        )}
      </div>
    </MenuWrapper>
  )
}
