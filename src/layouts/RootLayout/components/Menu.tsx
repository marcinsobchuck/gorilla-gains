import { useState } from "react"

import { listItems } from "./config"
import { MenuWrapper, StyledButton, UserEmail, UserImage, UserInfo, UserName } from "./Menu.styled"
import { ListItem } from "./Menu.types"
import gorillaPhoto from "../../../assets/gorillaPhoto.jpg"
import { useJwtDecoded } from "../../../hooks/useJwtDecoded"

export const Menu = () => {
  const [, setCurrentItem] = useState<ListItem>(listItems[0])

  const decodedToken = useJwtDecoded()

  const handleItemClick = (item: ListItem) => {
    setCurrentItem(item)
  }

  return (
    <MenuWrapper>
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
        <StyledButton to='/settings' buttonType='navLink' variant='tertiary' icon='settings'>
          <p>Settings</p>
        </StyledButton>
      </div>
    </MenuWrapper>
  )
}
