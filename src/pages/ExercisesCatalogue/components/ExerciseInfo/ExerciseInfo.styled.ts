import styled from "styled-components"

interface SectionTextProps {
  $highlight?: boolean
}

export const ExerciseInfoWrapper = styled.div`
  padding: 24px;
  height: 100%;
`

export const SectionDivider = styled.div`
  margin-bottom: 16px;
  max-width: 760px;
`
export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
`

export const SectionText = styled.p<SectionTextProps>`
  color: ${({ theme, $highlight }) => ($highlight ? theme.secondaryText : theme.primary)};
  font-size: 14px;
  font-weight: 400;
`

export const List = styled.ul`
  margin-top: 9px;
  padding-left: 24px;
  max-width: 560px;
`

export const ListItem = styled.li`
  list-style: disc;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 6px;
`
export const HighlightedText = styled.span`
  font-weight: 600;
  font-size: 14px;

  color: ${({ theme }) => theme.secondaryText};
`
