import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Button } from "@components/Button/Button"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { userDetailsSchema } from "./components/config"
import { Goals } from "./components/Goals"
import { PersonalInfo } from "./components/PersonalInfo"
import { PhysicalDetails } from "./components/PhysicalDetails"
import { ButtonsWrapper, StyledForm } from "./UserDetailsForm.styled"

interface UserDetailsFormProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const userDetailsSteps = [<PersonalInfo />, <PhysicalDetails />, <Goals />]

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const decodedJwt = useJwtDecoded()

  const methods = useForm({
    defaultValues: {
      name: "",
      surname: "",
      age: "",
      gender: "male",
      height: "",
      weight: "",
      desiredWeight: "",
      dueDateWeight: "",
      activityLevel: "",
    },
    mode: "all",
    resolver: zodResolver(userDetailsSchema),
  })

  const { handleSubmit, setValue, getValues } = methods

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
    console.log("submitaz")
  }

  useEffect(() => {
    if (decodedJwt?.name) {
      setValue("name", decodedJwt.name)
    }
  }, [decodedJwt, setValue])

  console.log(getValues())

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
        {userDetailsSteps[currentStep - 1]}
        <ButtonsWrapper>
          {!firstStep && (
            <Button
              variant='primary'
              buttonType='button'
              type='button'
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          )}
          {lastStep ? (
            <Button key='submit' buttonType='button' type='submit'>
              Submit
            </Button>
          ) : (
            <Button
              key='button'
              variant='primary'
              buttonType='button'
              type='button'
              onClick={handleNextStep}
            >
              Next
            </Button>
          )}
        </ButtonsWrapper>
      </StyledForm>
    </FormProvider>
  )
}
