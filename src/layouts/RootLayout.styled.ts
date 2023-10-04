import styled from "styled-components"

const headerHeight = "84px"

export const Wrapper = styled.div`
  height: 100vh;
`

export const Header = styled.header`
  display: flex;
  height: 84px;

  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding-left: 32px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  width: 36%;
`

export const RightSideWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;

  padding-right: 24px;
`
export const FlexContainer = styled.div`
  display: flex;
  height: calc(100vh - ${headerHeight});
`

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px 32px 44px 32px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  width: 15%;
  background-color: ${({ theme }) => theme.navBackgroundColor};
`

export const Sidebar = styled.aside`
  width: 21%;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
`
export const MainContentWrapper = styled.main`
  flex-grow: 1;
`

export const UserInfo = styled.div`
  padding-bottom: 24px;
  margin-right: 32px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const UserImage = styled.img`
  background-color: ${({ theme }) => theme.backgroundColor};
  object-fit: cover;
  width: 52px;
  height: 52px;
  border-radius: 50%;

  margin-bottom: 16px;
  padding: 3px;

  border: 2px solid ${({ theme }) => theme.secondary};
`

export const UserName = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 6px;
`

export const UserEmail = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryDisabled};
`

export const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.primaryMedium};
  }
`
