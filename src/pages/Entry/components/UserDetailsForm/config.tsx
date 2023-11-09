import { Goals } from "./components/Goals"
import { PersonalInfo } from "./components/PersonalInfo"
import { PhysicalDetails } from "./components/PhysicalDetails"
import { InputsNames } from "./UserDetailsForm.types"

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
