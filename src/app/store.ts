import { configureStore } from "@reduxjs/toolkit"

import authReducer from "@features/auth/authSlice"
import themeReducer from "@features/theme/themeSlice"
import userReducer from "@features/user/userSlice"

const store = configureStore({
  reducer: { theme: themeReducer, auth: authReducer, user: userReducer },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
