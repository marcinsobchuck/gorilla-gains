import { InputsNames } from "../UserDetailsForm/UserDetailsForm.types"

const stepOneInputs: InputsNames = ["name", "age", "gender"]
const stepTwoInputs: InputsNames = ["height", "weight", "activityLevel"]
const stepThreeInputs: InputsNames = ["desiredWeight", "dueDateWeight", "goals"]

export const requiredStepInputs = [stepOneInputs, stepTwoInputs, stepThreeInputs]
