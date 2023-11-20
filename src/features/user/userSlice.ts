import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { changeUserInfoAction, getCurrentUserInfoAction } from "./userActions"
import { InitialState } from "./userSlice.types"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(changeUserInfoAction.pending, getCurrentUserInfoAction.pending),
      (state) => {
        state.status = RequestStatuses.LOADING
      }
    )
    builder.addMatcher(
      isAnyOf(changeUserInfoAction.fulfilled, getCurrentUserInfoAction.fulfilled),
      (state, action) => {
        state.data = action.payload
        state.status = RequestStatuses.SUCCESS
      }
    )
    builder.addMatcher(
      isAnyOf(changeUserInfoAction.rejected, getCurrentUserInfoAction.rejected),
      (state, action) => {
        state.status = RequestStatuses.FAILED
        if (action.payload) {
          state.error = action.payload
        }
      }
    )
  },
})

export default userSlice.reducer
