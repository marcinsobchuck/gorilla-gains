import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, useForm, useFormState } from "react-hook-form"

import { Button } from "@components/Button/Button"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { userDetailsSchema } from "./config"
import { ButtonsWrapper, ProgressBar, StyledForm } from "./UserDetailsForm.styled"
import { InputsNames, UserDetailsFormProps } from "./UserDetailsForm.types"
import { defaultValues, stepInputs } from "../Stepper/config"

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  step,
  currentStep,
  isFirstStep,
  isLastStep,
  handleNextStep,
  handlePreviousStep,
}) => {
  const decodedJwt = useJwtDecoded()

  const methods = useForm({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(userDetailsSchema),
  })

  const { handleSubmit, setValue, control, watch, setFocus } = methods
  const formState = useFormState({ control })

  const onSubmit = () => {
    console.log("submitaz")
  }

  const getNumberOfInvalidInputs = (inputsNames: InputsNames) => {
    const errorFieldsKeys = Object.keys(formState.errors)
    const emptyFieldsPerStep = inputsNames.filter((inputName) => watch(inputName) === "")

    const invalidInputsNumber = inputsNames.filter(
      (inputName) => emptyFieldsPerStep.includes(inputName) || errorFieldsKeys.includes(inputName)
    ).length

    return invalidInputsNumber
  }

  const getNumberOfInvalidInputsPerStep = () => {
    switch (currentStep) {
      case 1:
        return getNumberOfInvalidInputs(stepInputs[0])
      case 2:
        return getNumberOfInvalidInputs(stepInputs[1])
      case 3:
        return getNumberOfInvalidInputs(stepInputs[2])
      default:
        return 0
    }
  }

  useEffect(() => {
    switch (currentStep) {
      case 1:
        return setFocus("name")
      case 2:
        return setFocus("height")
      case 3:
        return setFocus("desiredWeight")
    }
  }, [currentStep, setFocus])

  useEffect(() => {
    if (decodedJwt?.name) {
      setValue("name", decodedJwt.name)
    }
  }, [decodedJwt, setValue])

  return (
    <FormProvider {...methods}>
      <ProgressBar
        $numberOfInputs={stepInputs[currentStep - 1].length}
        $validInputs={stepInputs[currentStep - 1].length - getNumberOfInvalidInputsPerStep()}
      />

      <StyledForm onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
        {step}
        <ButtonsWrapper>
          {!isFirstStep && (
            <Button
              variant='primary'
              buttonType='button'
              type='button'
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          )}
          {isLastStep ? (
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
