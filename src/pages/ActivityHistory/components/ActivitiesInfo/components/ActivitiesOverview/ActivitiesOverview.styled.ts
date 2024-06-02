import styled from "styled-components"

export const Wrapper = styled.div`
  padding: 12px 18px;
  height: calc(100% - var(--activity-list-container-height) - 60px);
  overflow: auto;

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
