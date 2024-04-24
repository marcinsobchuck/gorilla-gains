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
  padding: 24px;
  font-weight: 500;
  font-size: 14px;
`

export const NoActivitiesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 500;
    text-align: center;
    max-width: 250px;
  }
`
