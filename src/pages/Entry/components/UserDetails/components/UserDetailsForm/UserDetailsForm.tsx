import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { FormProvider, useForm, useFormState } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@app/hooks"
import { Button } from "@components/Button/Button"
import { Routes } from "@enums/routes.enum"
import { changeUserInfoAction } from "@features/user/userActions"
import { useJwtDecoded } from "@hooks/useJwtDecoded"

import { userDetailsSchema } from "./config"
import { ButtonsWrapper, ProgressBar, StyledForm } from "./UserDetailsForm.styled"
import { InputsNames, UserDetailsFormProps } from "./UserDetailsForm.types"
import { requiredStepInputs } from "../Stepper/config"

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
  const methods = useForm({
    defaultValues: {
      goals: [],
    },
    mode: "onChange",
    resolver: yupResolver(userDetailsSchema),
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
      const dob = values.dob.toISOString()

      await dispatch(changeUserInfoAction({ ...values, dob, isOnboardingComplete: true })).unwrap()
      navigate(Routes.DASHBOARD)
    } catch (err) {
      console.error(err)
    }
  })

  const getNumberOfInvalidInputs = (inputsNames: InputsNames) => {
    const errorFieldsKeys = Object.keys(formState.errors)
    const emptyFieldsPerStep = inputsNames.filter((inputName) => {
      const value = watch(inputName)
      return (
        !value ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && value && "value" in value && value.value === "")
      )
    })

    const invalidInputsNumber = inputsNames.filter(
      (inputName) => emptyFieldsPerStep.includes(inputName) || errorFieldsKeys.includes(inputName)
    ).length
    return invalidInputsNumber
  }

  const getNumberOfInvalidInputsPerStep = () => {
    switch (currentStep) {
      case 1:
        return getNumberOfInvalidInputs(requiredStepInputs[0])
      case 2:
        return getNumberOfInvalidInputs(requiredStepInputs[1])
      case 3:
        return getNumberOfInvalidInputs(requiredStepInputs[2])
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
        $numberOfInputs={requiredStepInputs[currentStep - 1].length}
        $validInputs={
          requiredStepInputs[currentStep - 1].length - getNumberOfInvalidInputsPerStep()
        }
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
