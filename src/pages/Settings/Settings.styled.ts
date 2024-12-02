import styled from "styled-components"

import { MainContentWrapper } from "@layouts/RootLayout/RootLayout.styled"

export const StyledMainContentWrapper = styled(MainContentWrapper)`
  overflow: auto;
  scroll-padding-top: 48px;
  scroll-behavior: smooth;

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
