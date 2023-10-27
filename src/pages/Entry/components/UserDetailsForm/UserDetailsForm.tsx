import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Goals } from "./components/Goals"
import { PersonalInfo } from "./components/PersonalInfo"
import { PhysicalDetails } from "./components/PhysicalDetails"
import { ButtonsWrapper, StyledForm } from "./UserDetailsForm.styled"
import { Button } from "../../../../components/Button/Button"

interface UserDetailsFormProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const userDetailsSteps = [<PersonalInfo />, <PhysicalDetails />, <Goals />]

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const methods = useForm({ mode: "all" })

  const { handleSubmit, getValues } = methods

  const lastStep = currentStep === userDetailsSteps.length
  const firstStep = currentStep === 1

  const handleNextStep = () => {
    if (lastStep) return
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    if (firstStep) return
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const onSubmit = () => {
    console.log("submit")
  }

  useEffect(() => {
    console.log(getValues())
  }, [currentStep, getValues])

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {userDetailsSteps[currentStep - 1]}
        <ButtonsWrapper>
          {!firstStep && (
            <Button variant='primary' buttonType='button' onClick={handlePreviousStep}>
              Previous
            </Button>
          )}

          {lastStep ? (
            <Button buttonType='button' type='submit'>
              Submit
            </Button>
          ) : (
            <Button variant='primary' buttonType='button' onClick={handleNextStep}>
              Next
            </Button>
          )}
        </ButtonsWrapper>
      </StyledForm>
    </FormProvider>
  )
}
