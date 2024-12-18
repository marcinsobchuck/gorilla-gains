import styled from "styled-components"

interface NavTitleProps {
  $isActive: boolean
}

export const Wrapper = styled.div`
  padding: 24px;
`

export const SettingsTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 72px;
`

export const NavSectionTitle = styled.a<NavTitleProps>`
  font-weight: 600;
  font-size: 16px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.secondary : theme.primary)};
  transition: color 0.3s;
`

export const NavSubsectionTitle = styled.a<NavTitleProps>`
  font-weight: 500;
  font-size: 14px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.secondary : theme.primaryMedium)};
  transition: color 0.3s;
`

export const SectionListItem = styled.li`
  margin-bottom: 12px;
`

export const SubsectionList = styled.ul`
  padding: 6px 0 0 9px;
`

export const SubsectionListItem = styled.li`
  padding: 3px;
`
