import { InputsNames } from "../UserDetailsForm/UserDetailsForm.types"

const stepOneInputs: InputsNames = ["name", "dob", "gender"]
const stepTwoInputs: InputsNames = ["height", "weight", "activityLevel"]
const stepThreeInputs: InputsNames = ["goals"]

export const requiredStepInputs = [stepOneInputs, stepTwoInputs, stepThreeInputs]
