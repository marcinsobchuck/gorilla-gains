import { Step, StepName, StepNumber, Wrapper } from "./Stepper.styled"

export const Stepper = () => {
  return (
    <Wrapper>
      <Step>
        <StepNumber>1</StepNumber>
        <StepName>Personal info</StepName>
      </Step>
      <Step>
        <StepNumber>2</StepNumber>
        <StepName>Physical details</StepName>
      </Step>
      <Step>
        <StepNumber>3</StepNumber>
        <StepName>Goals</StepName>
      </Step>
    </Wrapper>
  )
}
