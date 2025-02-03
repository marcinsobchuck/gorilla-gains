import styled, { css } from "styled-components"

interface DatePickerWrapperProps {
  $isCalendarOpen: boolean
  $isFloating: boolean
}

export const DatePickerWrapper = styled.div<DatePickerWrapperProps>`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    position: relative;
    z-index: 1;
    display: flex;
    margin-bottom: 28px;

    svg {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      fill: ${({ theme }) => theme.secondary};
    }

    input {
      width: 100%;
      height: 64px;
      padding: 24px 24px 12px 24px;
      font-weight: 500;

      background-color: ${({ theme }) => theme.inputBackgroundColor};
      border: 2px solid transparent;
      border-radius: 9px;

      transition: all 0.3s;
      transition-delay: 0.1s;

      ${({ $isCalendarOpen }) =>
        $isCalendarOpen &&
        css`
          border: 2px solid ${({ theme }) => theme.secondary};
          box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
        `};

      &:hover {
        border-color: ${({ theme }) => theme.secondaryActive};
      }

      &:active,
      &:focus {
        border: 2px solid ${({ theme }) => theme.secondary};
        box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
      }
    }

    label {
      position: absolute;
      z-index: 0;
      top: 26px;
      left: 26px;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme }) => theme.primaryMedium};

      transition: all 0.2s ease-out;

      ${({ $isFloating }) =>
        $isFloating &&
        css`
          font-size: 12px;
          color: ${({ theme }) => theme.primaryDisabled};
          top: 6px;
        `};
    }
  }

  .react-datepicker {
    color: ${({ theme }) => theme.primary} !important;
    border-radius: 9px;
    border: none;
    background-color: ${({ theme }) => theme.datePickerBackgroundColor};
    box-shadow: ${({ theme }) => theme.popperBoxShadow};
  }

  .react-datepicker__header {
    border: none;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    background-color: ${({ theme }) => theme.selectBackgroundColor};

    .react-datepicker__year-dropdown-container {
      display: flex;
      justify-content: center;

      .react-datepicker__year-read-view {
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.inputBackgroundColor};
        padding: 6px;

        .react-datepicker__year-read-view--down-arrow {
          top: 7px;
          border-color: ${({ theme }) => theme.secondary};
        }
      }

      .react-datepicker__year-dropdown {
        background-color: ${({ theme }) => theme.selectBackgroundColor};
        border: none;
        box-shadow: ${({ theme }) => theme.boxShadow};
        color: red;

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

        .react-datepicker__year-option--selected {
          color: ${({ theme }) => theme.secondary};
        }

        .react-datepicker__year-option:hover {
          background-color: ${({ theme }) => theme.primaryDisabled};
        }
      }
    }
  }

  .react-datepicker__navigation {
    ::after,
    ::before {
      border-color: ${({ theme }) => theme.secondary};
    }
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-evenly;
  }

  .react-datepicker__day-name {
    width: 34px;
    height: 34px;
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    color: ${({ theme }) => theme.primary};

    &:not(.react-datepicker__day--today):hover {
      background-color: ${({ theme }) => theme.secondaryOpacity} !important;
    }

    transition: 0.2s ease-in-out;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.secondaryOpacity} !important;
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.primaryDisabled};
  }

  .react-datepicker__day--today {
    border-radius: 9px;
    background-color: ${({ theme }) => theme.inputBackgroundColor};
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primaryButtonColor};
    font-weight: 600;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.secondary};
    margin-bottom: 6px;
  }

  .react-datepicker__triangle {
    z-index: 1;
    transform: none !important;
    right: 36px !important;
    left: initial !important;
    &::after,
    &::before {
      border-bottom-color: ${({ theme }) => theme.inputBackgroundColor} !important;
    }
  }

  .react-datepicker-popper {
    z-index: 2;
  }
`
