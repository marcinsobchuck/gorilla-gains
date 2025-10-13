import { screen } from "@testing-library/react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { getMockActivity, mockActivitiesSummary } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { LastActivity } from "./LastActivity"

describe("Totals", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<LastActivity />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.LOADING,
        },
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<LastActivity />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.FAILED,
        },
      },
    })
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("should render proper message when no activity has been done in last 7 days", async () => {
    renderWithProviders(<LastActivity />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.SUCCESS,
          lastActivity: null,
        },
      },
    })
    expect(screen.getByText(/no activity registered in last 7 days/i)).toBeInTheDocument()
  })

  it("should render last activity card", async () => {
    renderWithProviders(<LastActivity />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.SUCCESS,
          lastActivity: getMockActivity(),
        },
      },
    })

    expect(screen.getByText(/last activity/i)).toBeInTheDocument()
    expect(screen.getByText(/test activity/i)).toBeInTheDocument()
    expect(screen.getByText(/strength/i)).toBeInTheDocument()
  })
})
