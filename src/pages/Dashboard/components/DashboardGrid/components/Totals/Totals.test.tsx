import { screen } from "@testing-library/react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockActivitiesSummary, mockActivitiesSummaryData, mockUser } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { Totals } from "./Totals"

describe("Totals", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<Totals />, {
      preloadedState: {
        activitiesSummary: mockActivitiesSummary,
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<Totals />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.FAILED,
        },
        user: mockUser,
      },
    })
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("should render proper message when no activities have been done yet", async () => {
    renderWithProviders(<Totals />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: null,
        },
      },
    })
    expect(screen.getByText(/no activities done/i)).toBeInTheDocument()
  })

  it("should render totals correctly", async () => {
    renderWithProviders(<Totals />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: {
            ...mockActivitiesSummaryData,
            totals: {
              distance: 20,
              reps: 10,
              weightLifted: 100,
            },
          },
        },
      },
    })

    expect(screen.getByText(/total weight lifted/i)).toBeInTheDocument()
    expect(screen.getByText(/100 kg/i)).toBeInTheDocument()
    expect(screen.getByText(/total distance covered/i)).toBeInTheDocument()
    expect(screen.getByText(/20 km/i)).toBeInTheDocument()
    expect(screen.getByText(/total reps done/i)).toBeInTheDocument()
    expect(screen.getByText(/10 reps/i)).toBeInTheDocument()
  })
})
