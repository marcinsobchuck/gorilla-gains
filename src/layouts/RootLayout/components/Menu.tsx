import { useState } from "react"

import gorillaPhoto from "@assets/gorillaPhoto.jpg"
import { Switch } from "@components/Switch/Switch"
import { Routes } from "@enums/routes.enum"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { listItems } from "./config"
import { MenuWrapper, StyledButton, UserEmail, UserImage, UserInfo, UserName } from "./Menu.styled"
import { ListItem, MenuProps } from "./Menu.types"

export const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
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
        <StyledButton to={Routes.SETTINGS} buttonType='navLink' variant='tertiary' icon='settings'>
          <p>Settings</p>
        </StyledButton>
        <Switch />
      </div>
    </MenuWrapper>
  )
}
