import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { changeUserInfoAction } from "./userActions"
import { InitialState } from "./userSlice.types"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUserInfoAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(changeUserInfoAction.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = RequestStatuses.SUCCESS
    })
    builder.addCase(changeUserInfoAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default userSlice.reducer
