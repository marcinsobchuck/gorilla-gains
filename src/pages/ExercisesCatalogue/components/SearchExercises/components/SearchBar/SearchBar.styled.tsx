import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"

interface FilterTileWrapperProps {
  $color: string
  $isActive: boolean
}
export const SearchBarWrapper = styled.div`
  padding: 24px;
  height: var(--exercises-search-bar-height);
`

export const Title = styled.h4`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 6px;
`

export const FilterTilesWrapper = styled(FlexContainer)`
  margin-bottom: 12px;
`

export const FilterTile = styled.button<FilterTileWrapperProps>`
  flex-grow: 1;
  border-radius: 9px;
  background-color: ${({ $color }) => $color};
  padding: 3px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme, $isActive }) => ($isActive ? theme.secondary : "transparent")};

  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
  }

  &:focus-visible {
    border: 2px solid ${({ theme }) => theme.secondaryActive};
  }
`
export const SearchLabel = styled.label`
  position: relative;
`

export const StyledIcon = styled(Icon)`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
`

export const SearchInput = styled.input`
  padding: 0px 52px;
  font-size: 14px;

  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;
  width: 100%;
  border: none;
  height: 64px;

  &::placeholder {
    font-size: 14px;
    font-weight: 500;
  }

  &:focus::placeholder {
    color: transparent;
  }
`
