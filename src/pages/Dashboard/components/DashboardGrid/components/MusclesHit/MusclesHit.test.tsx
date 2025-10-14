import { screen } from "@testing-library/react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockActivitiesSummary } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { MusclesHit } from "./MusclesHit"

describe("MusclesHit", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<MusclesHit />, {
      preloadedState: {
        activitiesSummary: mockActivitiesSummary,
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<MusclesHit />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.FAILED,
        },
      },
    })
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders human silhouette when data loads successfully", () => {
    renderWithProviders(<MusclesHit />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          weeklyActivitiesDataStatus: RequestStatuses.SUCCESS,
          musclesHit: {
            primary: ["chest", "backLats"],
            secondary: ["shoulders", "biceps", "traps", "backShoulders", "forearm"],
          },
        },
      },
    })

    screen.debug()

    expect(screen.getByText(/muscles hit in last 7 days/i)).toBeInTheDocument()
    expect(screen.getByTestId("human-silhouette")).toBeInTheDocument()
    expect(screen.getByText(/primary/i)).toBeInTheDocument()
    expect(screen.getByText(/secondary/i)).toBeInTheDocument()
  })
})
