import { screen } from "@testing-library/react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockUser, mockUserData } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { HealthMetrics } from "./HealthMetrics"

describe("HealthMetrics", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<HealthMetrics />, {
      preloadedState: { user: mockUser },
    })

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<HealthMetrics />, {
      preloadedState: { user: { ...mockUser, status: RequestStatuses.FAILED } },
    })

    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("should render all cards with health metrics data", async () => {
    renderWithProviders(<HealthMetrics />, {
      preloadedState: { user: { ...mockUser, status: RequestStatuses.SUCCESS, data: mockUserData } },
    })

    screen.getAllByTestId("basic-card").forEach((el) => expect(el).toBeInTheDocument())
  })
})
