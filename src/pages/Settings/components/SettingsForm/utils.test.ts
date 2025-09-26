import { SettingsFormValues } from "./SettingsForm.types"
import { getEditedData } from "./utils"

describe("getEditedData", () => {
  const mockFormValues: SettingsFormValues = {
    email: "test@test.com",
    name: "Test",
    surname: "test",
    dob: new Date("25/02/2025"),
    gender: "female",
    height: 170,
    weight: 65,
    activityLevel: "test",
    desiredWeight: 60,
    dueDateWeight: new Date("2024-12-31"),
    goals: [],
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  }

  it("returns only fields present in dirtyFields", () => {
    const dirtyFields = ["email", "weight"]
    const result = getEditedData(mockFormValues, dirtyFields)
    expect(result).toEqual({
      email: "test@test.com",
      weight: 65,
    })
  })

  it("returns empty object if no dirtyFields match", () => {
    const dirtyFields = ["random", "fields", ""]
    const result = getEditedData(mockFormValues, dirtyFields)
    expect(result).toEqual({})
  })
})
