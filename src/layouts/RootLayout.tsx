import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useTheme } from "styled-components"

import {
  FlexContainer,
  Header,
  LeftSideWrapper,
  Menu,
  RightSideWrapper,
  UserEmail,
  UserImage,
  UserInfo,
  UserName,
  Wrapper,
} from "./RootLayout.styled.ts"
import gorillaPhoto from "../assets/gorillaPhoto.jpg"
import { Button } from "../components/Button/Button.tsx"
import { IconName } from "../components/Icon/Icon.types.ts"
import { Logo } from "../components/Logo/Logo.tsx"
import { Background } from "../styles/GlobalStyle.ts"

interface ListItem {
  name: "Dashboard" | "History" | "Calendar"
  icon: IconName
  path: "/" | "activityHistory" | "calendar"
}

const listItems: ListItem[] = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: "/",
  },
  {
    name: "History",
    icon: "history",
    path: "activityHistory",
  },
  {
    name: "Calendar",
    icon: "calendar",
    path: "calendar",
  },
]

export const RootLayout = () => {
  const [currentItem, setCurrentItem] = useState<ListItem>(listItems[0])

  const theme = useTheme()

  const handleItemClick = (item: ListItem) => {
    setCurrentItem(item)
  }

  console.log(currentItem)
  return (
    <Background>
      <Wrapper>
        <Header>
          <LeftSideWrapper>
            <Logo />
          </LeftSideWrapper>
          <RightSideWrapper>
            <Button buttonType='button'>Create activity</Button>
          </RightSideWrapper>
        </Header>
        <FlexContainer>
          <Menu>
            <ul>
              {listItems.map((item) => (
                <Button
                  key={item.name}
                  buttonType='navLink'
                  to={item.path}
                  onClick={() => handleItemClick(item)}
                  icon={item.icon}
                  variant='tertiary'
                  textColor={theme.primary}
                >
                  {item.name}
                </Button>
              ))}
            </ul>
            <div>
              <UserInfo>
                <UserImage src={gorillaPhoto} alt='user avatar' />
                <UserName>Big poppa</UserName>
                <UserEmail>marcinsobchuck@gmail.com</UserEmail>
              </UserInfo>
              <Button to='/settings' buttonType='navLink' variant='tertiary' icon='settings'>
                <p>Settings</p>
              </Button>
            </div>
          </Menu>
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </Background>
  )
}
