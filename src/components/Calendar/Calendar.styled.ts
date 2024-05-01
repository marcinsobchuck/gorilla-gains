import styled from "styled-components"

export const CalendarWrapper = styled.div`
  width: 100%;
  margin-top: 24px;

  .fc .fc-toolbar-title {
    font-size: 18px;
    padding-left: 10px;
    color: ${({ theme }) => theme.primary};
  }

  .fc-button-group {
    gap: 9px;
    padding-right: 12px;
  }

  .fc .fc-button-group > .fc-button {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.primaryDisabled};
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
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

  .fc .fc-scroller-liquid-absolute {
    overflow: hidden !important;
  }
  .fc-col-header {
    margin-bottom: 12px;
    width: 100% !important;
  }

  .fc .fc-col-header-cell-cushion {
    color: ${({ theme }) => theme.primaryDisabled};
  }

  .fc .fc-daygrid-body {
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
    justify-content: center;
    align-items: center;

    &:hover .fc-daygrid-day-number {
      background-color: ${({ theme }) => theme.secondaryHover};
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
    transition: background-color 0.3s;
  }

  .fc-highlight {
    display: none;
  }

  .fc-day-selected .fc-daygrid-day-number {
    color: ${({ theme }) => theme.primaryButtonColor} !important;
    background-color: ${({ theme }) => theme.secondary};
  }

  .fc .fc-daygrid-day-events {
    width: 100%;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fc-daygrid-event-dot {
    border-color: ${({ theme }) => theme.secondary} !important;
    border-width: 3px;
  }

  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    margin: 0;
  }

  .fc-daygrid-dot-event {
    cursor: auto;
    &:hover {
      background-color: transparent;
    }
  }

  .fc .fc-daygrid-more-link {
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  }

  .fc .fc-daygrid-day-bottom {
    margin: 0;
    font-size: 12px;
  }

  .fc-event-title {
    display: none;
  }
`
