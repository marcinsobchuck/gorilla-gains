import { Goals } from "../UserDetailsForm/steps/Goals/Goals"
import { PersonalInfo } from "../UserDetailsForm/steps/PersonalInfo/PersonalInfo"
import { PhysicalDetails } from "../UserDetailsForm/steps/PhysicalDetails/PhysicalDetails"
import { InputsNames } from "../UserDetailsForm/UserDetailsForm.types"

export const defaultValues = {
  name: "",
  surname: "",
  age: "",
  gender: "male",
  height: "",
  weight: "",
  desiredWeight: "",
  dueDateWeight: "",
  activityLevel: "",
  goals: "",
}

const stepOneInputs: InputsNames = ["name", "age", "gender"]
const stepTwoInputs: InputsNames = ["height", "weight", "activityLevel"]
const stepThreeInputs: InputsNames = ["desiredWeight", "dueDateWeight", "goals"]
export const userDetailsSteps = [<PersonalInfo />, <PhysicalDetails />, <Goals />]

export const stepInputs = [stepOneInputs, stepTwoInputs, stepThreeInputs]
