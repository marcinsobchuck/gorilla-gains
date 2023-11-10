import { Step, StepName, StepNumber, StepsWrapper, Wrapper } from "./Stepper.styled"
import { StepperProps } from "./Stepper.types"

const steps = [
  {
    id: 1,
    name: "Personal info",
  },
  {
    id: 2,
    name: "Physical details",
  },
  {
    id: 3,
    name: "Goals",
  },
]

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <Wrapper>
      <StepsWrapper>
        {steps.map((step) => (
          <Step
            key={step.id}
            $isActive={currentStep === step.id}
            onClick={() => onStepClick(step.id)}
          >
            <StepNumber>{step.id}</StepNumber>
            <StepName>{step.name}</StepName>
          </Step>
        ))}
      </StepsWrapper>
    </Wrapper>
  )
}
