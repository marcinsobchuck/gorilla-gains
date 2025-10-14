import { screen } from "@testing-library/react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockActivitiesStatistics, mockActivitiesSummary, mockActivitiesSummaryData } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { ActivitiesStatistics } from "./ActivitiesStatistics"

describe("ActivitiesStatistics", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<ActivitiesStatistics />, {
      preloadedState: {
        activitiesSummary: mockActivitiesSummary,
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<ActivitiesStatistics />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.FAILED,
        },
      },
    })
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("should render proper message when no activities have been done yet", async () => {
    renderWithProviders(<ActivitiesStatistics />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
        },
      },
    })
    expect(screen.getByText(/no activities done/i)).toBeInTheDocument()
  })

  it("should render activities statistics", async () => {
    renderWithProviders(<ActivitiesStatistics />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: {
            ...mockActivitiesSummaryData,
            activitiesStatistics: mockActivitiesStatistics,
          },
        },
      },
    })

    expect(screen.getByText(/overall activities done/i)).toBeInTheDocument()
    expect(screen.getByText(/10/i)).toBeInTheDocument()
    expect(screen.getByText(/days since last activity/i)).toBeInTheDocument()
    expect(screen.getByText(/13/i)).toBeInTheDocument()
    expect(screen.getByText(/avg. activities/i)).toBeInTheDocument()
    expect(screen.getByText(/2/i)).toBeInTheDocument()
    expect(screen.getByText(/most common exercise/i)).toBeInTheDocument()
    expect(screen.getByText("test exercise (6)")).toBeInTheDocument()
  })
})
