import { getMockExercise, getMockSet } from "@fixtures/shared"

import { getExerciseMetrics } from "./utils"

describe("getExerciseMetrics", () => {
  it("returns exercise metrics in correct order", () => {
    expect(getExerciseMetrics(getMockExercise([getMockSet({ repeatCount: 2 })]))).toEqual([
      "load",
      "reps",
      "distance",
      "duration",
      "break",
      "repeatCount",
    ])
  })

  it("returns only valid metrics", () => {
    expect(getExerciseMetrics(getMockExercise([{ load: 30, reps: 12, break: 90 }]))).toEqual(["load", "reps", "break"])
    expect(getExerciseMetrics(getMockExercise([{ load: 30, reps: 12 }]))).toEqual(["load", "reps"])
  })
})
