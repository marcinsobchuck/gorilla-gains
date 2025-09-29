import { getMockActivity, getMockExercise, getMockSet } from "@fixtures/shared"

import {
  calculate1RM,
  getAvailableChartMetrics,
  getExerciseUnit,
  getFormattedDuration,
  getTooltipValue,
  getYAxisValue,
  transformActivitiesIntoChartData,
} from "./utils"

describe("calculate1RM", () => {
  it("calculates 1RM correctly", () => {
    expect(
      calculate1RM({
        load: 10,
        reps: 30,
      })
    ).toBe(20)
  })
  it("returns 0 if either load or reps is 0", () => {
    expect(calculate1RM({ load: 0, reps: 20 })).toBe(0)
    expect(calculate1RM({ load: 20, reps: 0 })).toBe(0)
  })
})

describe("getYAxisValue", () => {
  it("calculates distance correctly", () => {
    expect(getYAxisValue([getMockExercise()], "distance")).toBe(42)
    expect(getYAxisValue([getMockExercise(), getMockExercise()], "distance")).toBe(84)
    expect(
      getYAxisValue([getMockExercise([getMockSet({ distance: 30 }), getMockSet({ distance: 40 })])], "distance")
    ).toBe(70)
  })

  it("calculates duration correctly", () => {
    expect(getYAxisValue([getMockExercise()], "duration")).toBe(5460)
    expect(getYAxisValue([getMockExercise(), getMockExercise()], "duration")).toBe(10920)
    expect(
      getYAxisValue(
        [
          getMockExercise(),
          getMockExercise([
            getMockSet({ break: 180 }),
            getMockSet({
              duration: {
                hours: 1,
                minutes: 0,
                seconds: 0,
              },
              break: 0,
            }),
          ]),
        ],
        "duration"
      )
    ).toBe(14670)
  })

  it("calculates averageLoad correctly", () => {
    expect(getYAxisValue([getMockExercise()], "averageLoad")).toBe(50)
    expect(
      getYAxisValue(
        [getMockExercise(), getMockExercise([getMockSet({ reps: 12, load: 60 }), getMockSet({ reps: 10, load: 70 })])],
        "averageLoad"
      )
    ).toBeCloseTo(59.41)
  })

  it("calculates load correctly", () => {
    expect(getYAxisValue([getMockExercise()], "load")).toBe(600)
    expect(
      getYAxisValue(
        [getMockExercise(), getMockExercise([getMockSet({ reps: 12, load: 60 }), getMockSet({ reps: 10, load: 70 })])],
        "load"
      )
    ).toBe(2020)
  })

  it("calculates reps correctly", () => {
    expect(getYAxisValue([getMockExercise()], "reps")).toBe(12)
    expect(
      getYAxisValue(
        [
          getMockExercise(),
          getMockExercise([getMockSet({ reps: 12, load: 60 }), getMockSet({ reps: 10, load: 70, repeatCount: 2 })]),
        ],
        "reps"
      )
    ).toBe(44)
  })
})

describe("transformActivitiesIntoChartData", () => {
  it("returns only matching exercises", () => {
    expect(transformActivitiesIntoChartData([getMockActivity()], "ex1", "reps")).toEqual([])
    expect(transformActivitiesIntoChartData([getMockActivity()], "1", "reps")).toHaveLength(1)
  })

  it("returns empty array if no exercises or 0 y axis value", () => {
    expect(transformActivitiesIntoChartData([getMockActivity({ exercises: [] })], "1", "reps")).toEqual([])
    expect(
      transformActivitiesIntoChartData(
        [getMockActivity({ exercises: [getMockExercise([getMockSet({ reps: 0 })])] })],
        "1",
        "reps"
      )
    ).toEqual([])
  })

  it("returns correctly formatted chart data for valid activities", () => {
    expect(transformActivitiesIntoChartData([getMockActivity()], "1", "load")).toEqual([
      { averageLoad: 50, load: 600, date: 1759104000000, activityId: "123" },
    ])
  })

  it("returns sorted results by date ascending", () => {
    expect(
      transformActivitiesIntoChartData(
        [getMockActivity(), getMockActivity({ date: "2025-09-28", _id: "456" })],
        "1",
        "load"
      )
    ).toEqual([
      { averageLoad: 50, load: 600, date: 1759017600000, activityId: "456" },
      { averageLoad: 50, load: 600, date: 1759104000000, activityId: "123" },
    ])
  })
})

describe("getAvailableChartMetrics", () => {
  it("returns correct chart metrics for valid activities", () => {
    expect(
      getAvailableChartMetrics(
        [
          getMockActivity({
            exercises: [getMockExercise([{ reps: 10, load: 30, break: 20, repeatCount: 2 }])],
          }),
        ],
        "1"
      )
    ).toEqual(["reps", "load", "1RM"])
    expect(
      getAvailableChartMetrics(
        [
          getMockActivity({
            exercises: [getMockExercise([{ duration: { seconds: 30 }, break: 20, repeatCount: 2 }])],
          }),
        ],
        "1"
      )
    ).toEqual(["duration"])
  })
})

describe("getFormattedDuration", () => {
  it("formats the duration correctly", () => {
    expect(getFormattedDuration(60)).toEqual({ duration: "1", unit: "min" })
    expect(getFormattedDuration(59)).toEqual({ duration: "59", unit: "s" })
    expect(getFormattedDuration(3601)).toEqual({ duration: "2", unit: "h" })
  })
})

describe("getExerciseUnit", () => {
  it("returns correct exercise unit", () => {
    expect(getExerciseUnit([{ activityId: "1", date: new Date().getTime(), duration: 66 }], "duration")).toEqual("min")
    expect(getExerciseUnit([{ activityId: "1", date: new Date().getTime(), load: 60, reps: 10 }], "load")).toEqual("kg")
  })
})

describe("getTooltipValue", () => {
  it("returns correct tooltip value", () => {
    expect(getTooltipValue(3690, "duration")).toEqual({
      days: {
        value: undefined,
        unit: "d",
      },
      hours: {
        value: 1,
        unit: "h",
      },
      minutes: { value: 1, unit: "m" },
      seconds: { value: 30, unit: "s" },
    })
  })
})
