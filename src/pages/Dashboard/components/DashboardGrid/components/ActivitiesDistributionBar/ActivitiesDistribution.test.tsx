import { screen } from "@testing-library/react"

import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockActivitiesSummary, mockActivitiesSummaryData } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { ActivitiesDistributionBar } from "./ActivitiesDistributionBar"

describe("ActivitiesDistributionBar", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<ActivitiesDistributionBar />, {
      preloadedState: {
        activitiesSummary: mockActivitiesSummary,
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<ActivitiesDistributionBar />, {
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
    renderWithProviders(<ActivitiesDistributionBar />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: mockActivitiesSummaryData,
        },
      },
    })
    expect(screen.getByText(/no activities done/i)).toBeInTheDocument()
  })

  it("should render distribution bar with correct values when data is available", async () => {
    renderWithProviders(<ActivitiesDistributionBar />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: {
            ...mockActivitiesSummaryData,
            activityTypeDistribution: {
              distributionPerActivityType: [
                {
                  name: ActivityTypes.STRENGTH,
                  value: 15,
                },
                {
                  name: ActivityTypes.ENDURANCE,
                  value: 5,
                },
              ],
              totalDone: 20,
            },
          },
        },
      },
    })

    screen.getAllByTestId("activity-type-bar").forEach((el) => expect(el).toBeInTheDocument)
    expect(screen.getByText("75%")).toBeInTheDocument()
    expect(screen.getByText("25%")).toBeInTheDocument()
  })
})
