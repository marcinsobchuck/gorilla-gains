import { Exercise } from "@api/types/exercisesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { getMockSet } from "@fixtures/shared"

import { getDataToSubmit, transformExerciseIntoOption } from "./utils"

const getMockFormExercise = (overrides?: Partial<Exercise>): Exercise => {
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
  it("should return empty array if no match", () => {
    expect(
      transformExerciseIntoOption({ activityTypeId: "123", data: [getMockFormExercise()], inputValue: "hmm" })
    ).toEqual([])
  })
  it("should return correctly formatted option", () => {
    expect(
      transformExerciseIntoOption({ activityTypeId: "1", data: [getMockFormExercise()], inputValue: "test" })
    ).toEqual([{ value: "1", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true }])
  })

  it("should return only unique options", () => {
    expect(
      transformExerciseIntoOption({
        activityTypeId: "1",
        data: [getMockFormExercise(), getMockFormExercise(), getMockFormExercise({ _id: "2" })],
        inputValue: "test",
      })
    ).toEqual([
      { value: "1", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true },
      { value: "2", label: "test exercise", isStatic: true, additionalInfo: "test", isFavourite: true },
    ])
  })
})

describe("getDataToSubmit", () => {
  const mockFormValues = {
    activityType: {
      label: "strength",
      value: "1",
    },
    date: new Date("2025-09-28"),
    exercises: [
      {
        exercise: {
          value: "1",
        },
        sets: [getMockSet()],
        withBreaks: true,
      },
    ],
    repeatExercisesCount: 2,
    title: "test title",
    warmup: true,
    exertionRating: 3,
    makePresetFrom: true,
    notes: "test notes",
  }
  it("returns correctly formatted data to submit add/edit activity", () => {
    expect(getDataToSubmit(mockFormValues)).toEqual({
      date: new Date("2025-09-28"),
      exercises: [
        {
          exercise: "1",
          sets: [getMockSet()],
          withBreaks: true,
        },
      ],
      exertionRating: 3,
      makePresetFrom: true,
      notes: "test notes",
      repeatExercisesCount: 2,
      title: "test title",
      type: "1",
      warmup: true,
    })
  })
})
