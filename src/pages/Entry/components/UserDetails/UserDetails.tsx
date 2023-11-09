import { useState } from "react"

import { Stepper } from "./components/Stepper/Stepper"
import { UserDetailsForm } from "./components/UserDetailsForm/UserDetailsForm"
import { UserDetailsWrapper } from "./UserDetails.styled"

export const UserDetails = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const commonProps = { currentStep, setCurrentStep }

  return (
    <UserDetailsWrapper>
      <Stepper {...commonProps} />
      <UserDetailsForm {...commonProps} />
    </UserDetailsWrapper>
  )
}
