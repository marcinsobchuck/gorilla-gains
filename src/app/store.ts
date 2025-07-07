import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"

import activitiesReducer from "@features/activities/activitiesSlice"
import activitiesOverviewReducer from "@features/activitiesOverview/activitiesOverviewSlice"
import activitiesSummaryReducer from "@features/activitiesSummary/activitiesSummarySlice"
import activityPresetsReducer from "@features/activityPresets/activityPresetsSlice"
import activityTypesReducer from "@features/activityTypes/activityTypesSlice"
import authReducer from "@features/auth/authSlice"
import calendarSchedulerReducer from "@features/calendarScheduler/calendarSchedulerSlice"
import exercisesReducer from "@features/exercises/exercisesSlice"
import historyCalendarReducer from "@features/historyCalendar/historyCalendarSlice"
import themeReducer from "@features/theme/themeSlice"
import userReducer from "@features/user/userSlice"

const combinedReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  activityTypes: activityTypesReducer,
  exercises: exercisesReducer,
  activities: activitiesReducer,
  activityPresets: activityPresetsReducer,
  activitiesOverview: activitiesOverviewReducer,
  historyCalendar: historyCalendarReducer,
  activitiesSummary: activitiesSummaryReducer,
  calendarScheduler: calendarSchedulerReducer,
})

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === "auth/logout") {
    state = { theme: state?.theme } as RootState
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof combinedReducer>
export type AppDispatch = typeof store.dispatch
