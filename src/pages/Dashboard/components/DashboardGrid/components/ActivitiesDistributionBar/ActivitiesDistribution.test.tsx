import { screen } from "@testing-library/react"
import { HttpResponse, delay, http } from "msw"
import { setupServer } from "msw/node"

import { ActivityTypes } from "@enums/activityTypes.enum"
import { ApiEndpoints } from "@enums/apiEndpoints.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { renderWithProviders } from "@utils/test-utils"

import { ActivitiesDistributionBar } from "./ActivitiesDistributionBar"

const baseURL = import.meta.env.VITE_BASE_URL ?? ""

export const handlers = [
  http.get(`${baseURL}${ApiEndpoints.ACTIVITIES_SUMMARY}`, async () => {
    await delay(150)
    return HttpResponse.json({
      activityTypeDistribution: {
        distributionPerActivityType: [
          {
            name: "strength",
            value: 15,
          },
          {
            name: "balance",
            value: 8,
          },
          {
            name: "endurance",
            value: 9,
          },
          {
            name: "flexibility",
            value: 7,
          },
        ],
        totalDone: 39,
      },
    })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockActivitiesSummary = {
  activitiesSummaryData: null,
  lastActivity: null,
  musclesHit: null,
  shouldRefetchSummary: false,
  weeklyActivitiesDataStatus: RequestStatuses.SUCCESS,
  activitiesSummaryStatus: RequestStatuses.LOADING,
}

const mockActivitiesSummaryData = {
  totals: {
    weightLifted: 0,
    reps: 0,
    distance: 0,
  },
  activitiesStatistics: {
    activitiesCount: 0,
    daysSinceLastActivity: 0,
    averageActivitiesPerWeek: 0,
    mostCommonExercise: {
      maxCount: 0,
      mostCommonExercise: "",
    },
    unresolvedActivities: [],
    plannedActivities: [],
  },
  activitiesInYear: [],
  activityTypeDistribution: {
    totalDone: 0,
    distributionPerActivityType: [],
  },
}

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
