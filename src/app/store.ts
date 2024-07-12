import { configureStore } from "@reduxjs/toolkit"

import activitiesReducer from "@features/activities/activitiesSlice"
import activitiesOverviewReducer from "@features/activitiesOverview/activitiesOverviewSlice"
import activitiesSummaryReducer from "@features/activitiesSummary/activitiesSummarySlice"
import activityTypesReducer from "@features/activityTypes/activityTypesSlice"
import authReducer from "@features/auth/authSlice"
import exercisesReducer from "@features/exercises/exercisesSlice"
import historyCalendarReducer from "@features/historyCalendar/historyCalendarSlice"
import themeReducer from "@features/theme/themeSlice"
import userReducer from "@features/user/userSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    activityTypes: activityTypesReducer,
    exercises: exercisesReducer,
    activities: activitiesReducer,
    activitiesOverview: activitiesOverviewReducer,
    historyCalendar: historyCalendarReducer,
    activitiesSummary: activitiesSummaryReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
