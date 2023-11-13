import { Stepper } from "./components/Stepper/Stepper"
import { Goals } from "./components/UserDetailsForm/steps/Goals/Goals"
import { PersonalInfo } from "./components/UserDetailsForm/steps/PersonalInfo/PersonalInfo"
import { PhysicalDetails } from "./components/UserDetailsForm/steps/PhysicalDetails/PhysicalDetails"
import { UserDetailsForm } from "./components/UserDetailsForm/UserDetailsForm"
import { useMultiStepForm } from "./hooks/useMultiStepForm"
import { UserDetailsWrapper } from "./UserDetails.styled"

const userDetailsSteps = [<PersonalInfo />, <PhysicalDetails />, <Goals />]

export const UserDetails = () => {
  const {
    currentStep,
    setSpecificStep,
    step,
    isFirstStep,
    isLastStep,
    handleNextStep,
    handlePreviousStep,
  } = useMultiStepForm(userDetailsSteps)

  return (
    <UserDetailsWrapper>
      <Stepper currentStep={currentStep} onStepClick={setSpecificStep} />
      <UserDetailsForm
        step={step}
        currentStep={currentStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
      />
    </UserDetailsWrapper>
  )
}
