import { Activity, ExerciseSet, ResponseExercise } from "@api/types/activitiesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export const getMockSet = (overrides?: ExerciseSet): ExerciseSet => ({
  load: 50,
  reps: 12,
  distance: 42,
  duration: {
    seconds: 30,
    minutes: 30,
    hours: 1,
  },
  break: 30,
  ...overrides,
})

export const getMockExercise = (sets = [getMockSet()]): ResponseExercise => ({
  exercise: {
    _id: "1",
    name: "test exercise",
  },
  sets,
  withBreaks: true,
})

export const getMockActivity = (overrides: Partial<Activity> = {}): Activity => {
  return {
    _id: "123",
    title: "test activity",
    type: {
      _id: "123",
      type: ActivityTypes.STRENGTH,
    },
    date: "2025-09-29",
    exercises: [getMockExercise()],
    notes: "test note",
    warmup: true,
    repeatExercisesCount: 1,
    isDone: true,
    exertionRating: 3,
    createdAt: "test date",
    ...overrides,
  }
}

export const mockActivitiesSummary = {
  activitiesSummaryData: null,
  lastActivity: null,
  musclesHit: null,
  shouldRefetchSummary: false,
  weeklyActivitiesDataStatus: RequestStatuses.LOADING,
  activitiesSummaryStatus: RequestStatuses.LOADING,
}

export const mockActivitiesSummaryData = {
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

export const mockUser = {
  data: undefined,
  status: RequestStatuses.LOADING,
  error: undefined,

  changePasswordStatus: RequestStatuses.IDLE,
  changePasswordMessage: "",
  changePasswordError: null,
}

export const mockUserData = {
  _id: "1",
  name: "test",
  surname: "test",
  email: "test@test.pl",
  dob: "1957-03-02",
  gender: "m",
  weight: 34,
  activityLevel: "3",
  desiredWeight: 55,
  height: 166,
  dueDateWeight: "2024-04-12",
  goals: [],
  isOnboardingComplete: true,
}

export const mockActivitiesInYear = [
  {
    value: 1,
    fullMonthName: "October",
    strength: 1,
    name: "Oct",
  },
  {
    value: 0,
    name: "Nov",
  },
  {
    value: 1,
    fullMonthName: "December",
    balance: 1,
    name: "Dec",
  },
  {
    value: 0,
    name: "Jan",
  },
  {
    value: 7,
    fullMonthName: "February",
    strength: 2,
    endurance: 3,
    flexibility: 2,
    balance: 1,
    unresolved: 1,
    name: "Feb",
  },
  {
    value: 1,
    fullMonthName: "March",
    strength: 1,
    name: "Mar",
  },
  {
    value: 7,
    fullMonthName: "April",
    strength: 2,
    endurance: 2,
    flexibility: 2,
    balance: 1,
    name: "Apr",
  },
  {
    value: 5,
    fullMonthName: "May",
    endurance: 2,
    strength: 1,
    flexibility: 1,
    balance: 1,
    name: "May",
  },
  {
    value: 11,
    fullMonthName: "June",
    strength: 6,
    endurance: 3,
    unresolved: 3,
    balance: 3,
    flexibility: 2,
    name: "Jun",
  },
  {
    value: 0,
    name: "Jul",
  },
  {
    value: 0,
    name: "Aug",
  },
  {
    value: 1,
    fullMonthName: "September",
    strength: 1,
    name: "Sep",
  },
  {
    value: 2,
    fullMonthName: "October",
    strength: 1,
    balance: 1,
    name: "Oct",
  },
]

export const mockActivitiesStatistics = {
  activitiesCount: 10,
  daysSinceLastActivity: 13,
  averageActivitiesPerWeek: 2,
  mostCommonExercise: {
    maxCount: 6,
    mostCommonExercise: "test exercise",
  },
  unresolvedActivities: [],
  plannedActivities: [],
}
