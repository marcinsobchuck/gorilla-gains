import { useState } from "react"

export const useMultiStepForm = (steps: JSX.Element[]) => {
  const [currentStep, setCurrentStep] = useState(1)

  const isLastStep = currentStep === steps.length
  const isFirstStep = currentStep === 1

  const handleNextStep = () => {
    if (isLastStep) return
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    if (isFirstStep) return
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const setSpecificStep = (step: number) => setCurrentStep(step)

  const step = steps[currentStep - 1]

  return {
    handleNextStep,
    handlePreviousStep,
    currentStep,
    step,
    isLastStep,
    isFirstStep,
    setSpecificStep,
  }
}
