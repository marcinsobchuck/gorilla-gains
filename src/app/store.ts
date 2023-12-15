import { configureStore } from "@reduxjs/toolkit"

import activityTypesReducer from "@features/activityTypes/activityTypesSlice"
import authReducer from "@features/auth/authSlice"
import themeReducer from "@features/theme/themeSlice"
import userReducer from "@features/user/userSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    activityTypes: activityTypesReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
