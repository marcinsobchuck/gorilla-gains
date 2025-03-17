import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./activityPresets.types"
import {
  createActivityPresetAction,
  deleteActivityPresetAction,
  getActivityPresetsAction,
} from "./activityPresetsActions"

const initialState: InitialState = {
  activityPresets: [],
  status: RequestStatuses.IDLE,
  isActivityPresetsVisible: false,
}

export const activityPresetsSlice = createSlice({
  name: "activityPresets",
  initialState,
  reducers: {
    setIsActivityPresetsVisible(state, action) {
      state.isActivityPresetsVisible = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivityPresetsAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(getActivityPresetsAction.fulfilled, (state, action) => {
      state.activityPresets = action.payload
      state.status = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivityPresetsAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
    builder.addCase(createActivityPresetAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(createActivityPresetAction.fulfilled, (state, action) => {
      state.activityPresets = [action.payload, ...state.activityPresets]
      state.status = RequestStatuses.SUCCESS
      toast("Succesfully created preset")
    })
    builder.addCase(createActivityPresetAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
    builder.addCase(deleteActivityPresetAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(deleteActivityPresetAction.fulfilled, (state, action) => {
      state.activityPresets = state.activityPresets.filter(
        (preset) => preset._id !== action.payload._id
      )
      state.status = RequestStatuses.SUCCESS
      toast("Succesfully deleted preset")
    })
    builder.addCase(deleteActivityPresetAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default activityPresetsSlice.reducer
export const { setIsActivityPresetsVisible } = activityPresetsSlice.actions
