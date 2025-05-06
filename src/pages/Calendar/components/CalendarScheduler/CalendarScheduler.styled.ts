import styled, { css } from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"

interface CalendarWrapperProps {
  $isLoading: boolean
}

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  padding: 24px 12px;
  height: 100%;
  width: 100%;

  @media ${Breakpoints.MEDIUM} {
    padding: 24px;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    padding-right: 12px;
    padding-left: 12px;

    h2 {
      display: inline;
    }
  }

  .fc .fc-toolbar-title {
    font-size: 18px;
    color: ${({ theme }) => theme.primary};
  }

  .fc-today-button {
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    border: none;
    background-color: ${({ theme }) => theme.navBackgroundColor} !important;
    color: ${({ theme }) => theme.secondary} !important;
    box-shadow: none !important;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryOpacity} !important;
    }

    &:disabled {
      color: ${({ theme }) => theme.secondaryDisabled} !important;
      cursor: not-allowed;
    }
  }

  .fc-button-group {
    gap: 9px;
  }

  .fc .fc-button-group > .fc-button {
    border-radius: 50%;
    border: none;
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.navBackgroundColor};
    transition: 0.3s;

    &:active,
    &:focus {
      box-shadow: none !important;
    }
  }

  .fc .fc-button-primary:hover {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }

  .fc .fc-button .fc-icon {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.secondary};
  }

  .fc-daygrid {
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      opacity: 0;
      backdrop-filter: blur(0);
      z-index: 0;

      ${({ $isLoading }) =>
        $isLoading &&
        css`
          opacity: 1;
          backdrop-filter: blur(3px);
          z-index: 1;
        `}
    }
  }

  .fc .fc-scroller-liquid-absolute {
    overflow: hidden !important;
  }
  .fc-col-header {
    width: 100% !important;
  }

  .fc .fc-col-header-cell-cushion {
    font-size: 12px;
    color: ${({ theme }) => theme.primaryDisabled};

    @media ${Breakpoints.MEDIUM} {
      font-size: 14px;
    }
  }

  .fc .fc-daygrid-body {
    background: ${({ theme }) => theme.navBackgroundColor};
    border-radius: 12px;
    width: 100% !important;
    height: 100% !important;
  }

  .fc .fc-scrollgrid-section-body table {
    width: 100% !important;
    height: 100% !important;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    cursor: pointer;
    border: none;
  }

  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }

  .fc .fc-daygrid-day-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6px;
    border-radius: 12px;
    transition: 0.3s;

    &:hover,
    &:focus-within {
      background-color: ${({ theme }) => theme.secondaryOpacity};
    }
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: transparent;

    .fc-daygrid-day-number {
      border: 1px solid ${({ theme }) => theme.primaryDisabled};
      font-weight: 600;
    }
  }

  .fc .fc-day-other .fc-daygrid-day-top {
    opacity: 1;
    a {
      color: ${({ theme }) => theme.primaryDisabled};
    }
  }

  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-size: 14px;

    transition: background-color 0.3s;
    margin-bottom: 6px;

    @media ${Breakpoints.MEDIUM} {
      font-size: 16px;
    }
  }

  .fc-day-selected .fc-daygrid-day-number {
    color: ${({ theme }) => theme.primaryButtonColor} !important;
    background-color: ${({ theme }) => theme.secondary};
  }

  .fc-day-selected .fc-daygrid-day-frame {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }

  .fc .fc-daygrid-day-events {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fc .fc-daygrid-day-bottom {
    position: absolute;
    bottom: -16px;
    margin: 0;
    font-size: 12px;
  }

  .fc-event-title {
    color: ${({ theme }) => theme.backgroundColor};
  }

  .fc-daygrid-event {
    border: none;
    background-color: transparent !important;
    padding: 3px;
    font-size: 12px;
    font-weight: 600;
  }

  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    margin: 0;
  }

  .fc .fc-daygrid-more-link {
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  }

  .fc-daygrid-day-events {
    pointer-events: none;
  }
`
