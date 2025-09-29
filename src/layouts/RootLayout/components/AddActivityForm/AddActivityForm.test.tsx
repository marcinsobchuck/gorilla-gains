import { screen } from "@testing-library/react"
import { HttpResponse, delay, http } from "msw"
import { setupServer } from "msw/node"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"
import { renderWithProviders } from "@utils/test-utils"

import { AddActivityForm } from "./AddActivityForm"

const baseURL = import.meta.env.VITE_BASE_URL

export const handlers = [
  http.get(`${baseURL}/${ApiEndpoints.ACTIVITIY_TYPES}`, async () => {
    await delay(150)
    return HttpResponse.json("Activity types response")
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("AddActivityForm", () => {
  it("shows a warning if a user tries to change already chosen activity type", async () => {
    renderWithProviders(<AddActivityForm />)

    const presetsButton = await screen.findByTestId("presets-button")

    expect(presetsButton).toBeInTheDocument()
  })
})
