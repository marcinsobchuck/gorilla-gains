import styled from "styled-components"

interface ProgressBarProps {
  $numberOfInputs: number
  $validInputs: number
}

export const StyledForm = styled.form`
  min-height: 540px;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`

export const ButtonsWrapper = styled.div`
  margin-top: auto;

  display: flex;
  justify-content: space-between;

  button:last-of-type {
    margin-left: auto;
  }
`

export const ProgressBar = styled.div<ProgressBarProps>`
  overflow: hidden;
  width: 100%;
  height: 5px;
  margin-bottom: 24px;
  border-radius: 9px;

  background-color: ${({ theme }) => theme.primaryDisabled};

  &:after {
    content: "";
    display: block;
    width: ${({ $numberOfInputs, $validInputs }) =>
      `calc((100% / ${$numberOfInputs}) * ${$validInputs})`};
    height: 100%;
    background-color: ${({ theme }) => theme.secondary};

    transition: 0.3s;
  }
`
