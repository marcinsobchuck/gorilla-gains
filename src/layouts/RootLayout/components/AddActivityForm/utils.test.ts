import { Exercise } from "@api/types/exercisesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"

import { transformExerciseIntoOption } from "./utils"

const getMockExercise = (overrides?: Partial<Exercise>): Exercise => {
  return {
    _id: "1",
    name: "test exercise",
    activityType: {
      _id: "1",
      type: ActivityTypes.STRENGTH,
    },
    description: "test",
    videoURL: "test",
    additionalInfo: "test",
    isStatic: true,
    musclesHit: {
      primary: ["1", "test"],
      secondary: ["1", "test"],
    },
    isFavourite: true,
    ...overrides,
  }
}

describe("transformExerciseIntoOption", () => {
  it("should empty array if no match", () => {
    expect(
      transformExerciseIntoOption({ activityTypeId: "123", data: [getMockExercise()], inputValue: "hmm" })
    ).toEqual([])
  })
  it("should return correctly formatted option", () => {
    expect(transformExerciseIntoOption({ activityTypeId: "1", data: [getMockExercise()], inputValue: "test" })).toEqual(
      [{ value: "1", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true }]
    )
  })

  it("should return only unique options", () => {
    expect(
      transformExerciseIntoOption({
        activityTypeId: "1",
        data: [getMockExercise(), getMockExercise(), getMockExercise({ _id: "2" })],
        inputValue: "test",
      })
    ).toEqual([
      { value: "1", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true },
      { value: "2", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true },
    ])
  })
})
