import styled from "styled-components"

export const InfoItemWrapper = styled.div`
  height: 100%;
  padding: 28px;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  border-radius: 9px;
  overflow: auto;

  box-shadow: ${({ theme }) => theme.boxShadow};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const StyledSection = styled.section`
  margin-top: 32px;
  max-width: 760px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
  }
`

export const FavouriteExerciseInfo = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.primaryMedium};
  max-width: 180px;
`
