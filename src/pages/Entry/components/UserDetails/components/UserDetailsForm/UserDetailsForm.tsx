import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, useForm, useFormState } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { Routes } from "@enums/routes.enum"
import { changeUserInfoAction } from "@features/user/userActions"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { defaultValues, userDetailsSchema } from "./config"
import { ButtonsWrapper, ProgressBar, StyledForm } from "./UserDetailsForm.styled"
import { InputsNames, UserDetailsFormProps, UserDetailsFormValues } from "./UserDetailsForm.types"
import { stepInputs } from "../Stepper/config"

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  step,
  currentStep,
  isFirstStep,
  isLastStep,
  handleNextStep,
  handlePreviousStep,
}) => {
  const dispatch = useAppDispatch()

  const decodedJwt = useJwtDecoded()
  const navigate = useNavigate()
  const methods = useForm<UserDetailsFormValues>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(userDetailsSchema),
  })

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    setFocus,
    formState: { isSubmitting },
  } = methods
  const formState = useFormState({ control })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await dispatch(changeUserInfoAction(values)).unwrap()
      navigate(Routes.DASHBOARD)
    } catch (err) {
      console.error(err)
    }
  })

  const getNumberOfInvalidInputs = (inputsNames: InputsNames) => {
    const errorFieldsKeys = Object.keys(formState.errors)
    const emptyFieldsPerStep = inputsNames.filter((inputName) => {
      const value = watch(inputName)

      return value === "" || (Array.isArray(value) && value.length === 0)
    })

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

      <StyledForm onSubmit={onSubmit}>
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
            <Button disabled={isSubmitting} key='submit' buttonType='button' type='submit'>
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
