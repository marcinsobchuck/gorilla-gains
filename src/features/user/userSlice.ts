import { createSlice } from "@reduxjs/toolkit"

import { changeUserInfoAction } from "./userActions"

const initialState = {
  status: "idle",
  error: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUserInfoAction.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(changeUserInfoAction.fulfilled, (state) => {
      state.status = "success"
    })
    builder.addCase(changeUserInfoAction.rejected, (state, action) => {
      state.status = "failed"
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default userSlice.reducer
