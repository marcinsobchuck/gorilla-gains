import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  position: relative;
  padding: 36px 12px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.backgroundColor};

  overflow: auto;

  .recharts-brush {
    transform: translateY(6px);
  }

  @media ${Breakpoints.MEDIUM} {
    padding: 9px 18px;
  }

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
export const ChartTitle = styled.h3`
  position: static;
  font-weight: 500;
  text-align: center;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};

  @media ${Breakpoints.MEDIUM} {
    position: absolute;
    font-size: 12px;

    top: 16px;
    left: 40px;
  }
`
