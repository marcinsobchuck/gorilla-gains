import { calculate1RM } from "./utils"

describe("calculate1RM", () => {
  it("calculates 1RM correctly", () => {
    expect(
      calculate1RM({
        load: 10,
        reps: 30,
      })
    ).toBe(20)
  })
})
