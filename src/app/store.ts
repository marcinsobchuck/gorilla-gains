import { configureStore } from "@reduxjs/toolkit"

import activitiesReducer from "@features/activities/activitiesSlice"
import activityTypesReducer from "@features/activityTypes/activityTypesSlice"
import authReducer from "@features/auth/authSlice"
import exercisesReducer from "@features/exercises/exercisesSlice"
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
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
