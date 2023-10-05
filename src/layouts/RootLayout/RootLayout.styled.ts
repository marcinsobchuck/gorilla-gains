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
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};

  border-right: 1px solid ${({ theme }) => theme.borderColor};

  @media (min-width: 960px) {
    justify-content: flex-start;

    width: 36%;
    padding-left: 32px;
  }
`

export const RightSideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  padding-right: 0;

  @media (min-width: 960px) {
    padding-right: 32px;
    justify-content: flex-end;
  }
`
export const FlexContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: calc(100vh - ${headerHeight});

  @media (min-width: 960px) {
    flex-direction: row;
  }
`

export const Sidebar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.borderColor};

  @media (min-width: 960px) {
    width: 31%;
  }

  @media (min-width: 1360px) {
    width: 21%;
  }
`
export const MainContentWrapper = styled.main`
  flex-grow: 1;
`
