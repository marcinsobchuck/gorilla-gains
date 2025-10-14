import { screen } from "@testing-library/react"
import { ReactElement } from "react"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import { mockActivitiesInYear, mockActivitiesSummary, mockActivitiesSummaryData } from "@fixtures/shared"
import { renderWithProviders } from "@utils/test-utils"

import { ActivitiesBarChart } from "./ActivitiesBarChart"

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal("ResizeObserver", ResizeObserverMock)

vi.mock("recharts", async () => {
  const OriginalModule = await vi.importActual<typeof import("recharts")>("recharts")
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: ReactElement }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  }
})

describe("ActivitiesBarChart", () => {
  it("should render loading skeleton when data is fetching", async () => {
    renderWithProviders(<ActivitiesBarChart />, {
      preloadedState: {
        activitiesSummary: mockActivitiesSummary,
      },
    })
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render message when fetch failed", async () => {
    renderWithProviders(<ActivitiesBarChart />, {
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
    renderWithProviders(<ActivitiesBarChart />, {
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

  it("should render chart with correct data", async () => {
    renderWithProviders(<ActivitiesBarChart />, {
      preloadedState: {
        activitiesSummary: {
          ...mockActivitiesSummary,
          activitiesSummaryStatus: RequestStatuses.SUCCESS,
          activitiesSummaryData: {
            ...mockActivitiesSummaryData,
            activitiesInYear: mockActivitiesInYear,
          },
        },
      },
    })

    expect(screen.getByText(/activities per month/i)).toBeInTheDocument()
    expect(screen.getByText(/strength/i)).toBeInTheDocument()
    expect(screen.getByText(/balance/i)).toBeInTheDocument()
    expect(screen.getByText(/endurance/i)).toBeInTheDocument()
    expect(screen.getByText(/flexibility/i)).toBeInTheDocument()
    expect(screen.getByText(/unresolved/i)).toBeInTheDocument()
  })
})
