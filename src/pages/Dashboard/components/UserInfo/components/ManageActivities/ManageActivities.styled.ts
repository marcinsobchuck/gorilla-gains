import styled from "styled-components"

import { ActivityEventCard } from "@components/ActivityEventCard/ActivityEventCard"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface WrapperProps {
  $isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 24px 0;

  transition: 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};

  background-color: ${({ theme }) => theme.navBackgroundColor};
`

export const HeaderWrapper = styled(FlexContainer)`
  padding: 0 24px;
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0;
`

export const ManagedActivitiesList = styled.div`
  margin-top: 12px;
  overflow: auto;
  padding: 0 24px;
  height: 90%;

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

export const StyledActivityEventCard = styled(ActivityEventCard)`
  border: none;
  cursor: auto;
  &:hover {
    border: none;
  }
`
