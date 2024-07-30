import { describe, expect, it } from "vitest"

import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

describe("capitalizeFirstLetter", () => {
  it("should capitalize first letter of the given string", () => {
    const someString = "something"
    expect(capitalizeFirstLetter(someString)).toEqual("Something")
  })
})
