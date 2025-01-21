import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"

interface ExerciseListItemProps {
  $gradient?: string
}

export const ExerciseListWrapper = styled.li`
  overflow: auto;
  height: calc(100% - var(--exercises-search-bar-height) - 66px);
  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.navBackgroundColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 9px;
    border: ${({ theme }) => `6px solid ${theme.backgroundColor}`};
    background-clip: content-box;
    background: ${({ theme }) => theme.secondary};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondaryActive};
  }
`

export const ExerciseListItem = styled(FlexContainer)<ExerciseListItemProps>`
  width: 100%;
  height: 72px;
  padding: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
  cursor: pointer;
  background-image: ${({ $gradient, theme }) => ($gradient ? $gradient : theme.backgroundGradient)};
  transition: 0.3s ease-in-out;

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.primaryDisabled};
  }

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }
`

export const LoadMore = styled(FlexContainer)`
  position: relative;
  color: ${({ theme }) => theme.primaryDisabled};
  padding: 24px;
  font-weight: 500;
  font-size: 14px;
`

export const StyledLoaderSpinner = styled(LoaderSpinner)`
  position: absolute;
  transform: translateY(-50%);
  right: 24px;
`
