import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  changeUserInfoAction,
  changeUserPasswordAction,
  getCurrentUserInfoAction,
} from "./userActions"
import { InitialState } from "./userSlice.types"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
  changePasswordMessage: "",
  changePasswordStatus: RequestStatuses.IDLE,
  changePasswordError: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUserPasswordAction.pending, (state) => {
      state.changePasswordStatus = RequestStatuses.LOADING
    })
    builder.addCase(changeUserPasswordAction.fulfilled, (state, action) => {
      state.changePasswordStatus = RequestStatuses.SUCCESS
      state.changePasswordError = ""
      state.changePasswordMessage = action.payload
    })
    builder.addCase(changeUserPasswordAction.rejected, (state, action) => {
      state.changePasswordStatus = RequestStatuses.FAILED
      state.changePasswordError = action.payload
    })

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
