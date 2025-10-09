import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HttpResponse, delay, http } from "msw"
import { setupServer } from "msw/node"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"
import { renderWithProviders } from "@utils/test-utils"

import { AddActivityForm } from "./AddActivityForm"

const submitResponseResolver = vi.fn()

export const handlers = [
  http.get(`${ApiEndpoints.ACTIVITIY_TYPES}`, async () => {
    await delay(150)
    return HttpResponse.json([
      {
        _id: "65fc71b398898a9e7ef3b1a6",
        type: "strength",
      },
      {
        _id: "2",
        type: "endurance",
      },
    ])
  }),
  http.get(`${ApiEndpoints.FAVOURITE_EXERCISES}`, async () => {
    await delay(150)
    return HttpResponse.json([])
  }),
  http.get(`${ApiEndpoints.EXERCISES}`, async ({ request }) => {
    await delay(150)

    const url = new URL(request.url)
    const q = url.searchParams.get("activityType")

    if (q === "65fc71b398898a9e7ef3b1a6") {
      return HttpResponse.json([
        {
          musclesHit: {
            primary: ["chest"],
            secondary: ["shoulders"],
          },
          _id: "660170849d36159744c8960e",
          activityType: {
            _id: "65fc71b398898a9e7ef3b1a6",
            type: "strength",
            __v: 0,
          },
          name: "Bench press",
          isStatic: false,
        },
      ])
    }
  }),
  http.post(`${ApiEndpoints.ACTIVITIES}`, async ({ request }) => {
    const json = await request.json()
    submitResponseResolver(json)
    return HttpResponse.json({ ok: true })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("AddActivityForm", () => {
  it("shows a warning if a user tries to change already chosen activity type", async () => {
    const user = userEvent.setup()

    renderWithProviders(<AddActivityForm />)

    await user.click(await screen.findByLabelText(/activity type/i))

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await user.click(await screen.findByRole("option", { name: /strength/i }))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

    expect(screen.queryAllByRole("option")).toHaveLength(0)

    await user.click(await screen.findByLabelText(/activity type/i))

    await user.click(await screen.findByRole("option", { name: /endurance/i }))

    expect(await screen.findByTestId("input-warning")).toBeInTheDocument()

    await user.click(await screen.findByRole("button", { name: /yes/i }))

    expect(screen.queryByTestId("input-warning")).not.toBeInTheDocument()
  })

  it("does not allow submitting if there are any errors", async () => {
    const user = userEvent.setup()

    renderWithProviders(<AddActivityForm />)

    await user.click(screen.getByTestId("submit-button"))

    expect(screen.queryAllByText(/required/i)).toHaveLength(3)

    await user.type(screen.getByLabelText(/title/i), "test title")

    await user.click(screen.getByLabelText(/activity type/i))
    await user.click(await screen.findByRole("option", { name: /strength/i }))
    await user.type(screen.getByLabelText(/date/i), "08/10/2025")

    expect(screen.queryAllByText(/required/i)).toHaveLength(1)

    await user.click(await screen.findByRole("combobox", { name: /exercise/i }))
    await screen.findByRole("option", { name: /bench press/i })
    await user.click(screen.getByRole("option", { name: /bench press/i }))

    expect(screen.queryAllByText(/required/i)).toHaveLength(1)

    await user.type(await screen.findByLabelText("reps"), "12")

    expect(screen.queryAllByText(/required/i)).toHaveLength(0)

    await user.click(screen.getByTestId("submit-button"))

    expect(submitResponseResolver).toHaveBeenCalled()
  })

  it("submits the form with correct data", async () => {
    const user = userEvent.setup()

    renderWithProviders(<AddActivityForm />)

    await user.type(screen.getByLabelText(/title/i), "test title")
    await user.click(screen.getByLabelText(/activity type/i))
    await user.click(await screen.findByRole("option", { name: /strength/i }))
    await user.type(screen.getByLabelText(/date/i), "2025-10-09")
    await user.click(await screen.findByRole("combobox", { name: /exercise/i }))
    await screen.findByRole("option", { name: /bench press/i })
    await user.click(screen.getByRole("option", { name: /bench press/i }))
    await user.type(await screen.findByLabelText("reps"), "12")
    await user.click(screen.getByTestId("submit-button"))

    expect(submitResponseResolver).toHaveBeenCalled()
    expect(submitResponseResolver).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "test title",
        type: "65fc71b398898a9e7ef3b1a6",
        exercises: expect.arrayContaining([
          expect.objectContaining({
            exercise: "660170849d36159744c8960e",
            sets: expect.arrayContaining([expect.objectContaining({ reps: 12 })]),
          }),
        ]),
        date: "2025-10-09T00:00:00.000Z",
        warmup: false,
      })
    )
  })
})
