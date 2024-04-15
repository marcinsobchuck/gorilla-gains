import styled from "styled-components"

export const Wrapper = styled.div`
  padding: 24px;
  height: 50%;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};

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

export const LoadMore = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  padding: 12px 0 42px 0;
  font-weight: 500;
  font-size: 14px;
`
