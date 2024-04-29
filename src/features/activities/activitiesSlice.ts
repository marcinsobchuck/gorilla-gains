import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  createActivityAction,
  deleteActivityAction,
  editActivityAction,
  getActivitiesForCurrentUserAction,
  getPresetsForCurrentUserAction,
} from "./activitiesActions"
import { InitialState } from "./activitiesSlice.types"

const initialState: InitialState = {
  activitiesStatus: RequestStatuses.IDLE,
  createActivityStatus: RequestStatuses.IDLE,
  deleteActivityStatus: RequestStatuses.IDLE,
  editActivityStatus: RequestStatuses.IDLE,
  presetsStatus: RequestStatuses.IDLE,
  activitiesPage: 1,
  limit: 3,
  hasMore: true,
  isEditing: false,
  isAddEditModalOpen: false,
  activitiesData: [],
  currentlyProcessedActivityId: null,
}

export const userSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    removePreset(state, action) {
      state.presetsData = state.presetsData?.filter((preset) => preset._id !== action.payload)
    },
    setHasMore(state, action) {
      state.hasMore = action.payload
    },
    toggleIsPreset(state) {
      state.activitiesData = state.activitiesData?.map((activity) => ({
        ...activity,
        isPreset: !activity.isPreset,
      }))
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload
    },
    setIsAddEditModalOpen(state, action) {
      state.isAddEditModalOpen = action.payload
    },
    setCurrentlyEditedActivity(state, action) {
      state.currentlyEditedActivity = action.payload
    },
    setCurrentlyProcessedActivityId(state, action) {
      state.currentlyProcessedActivityId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForCurrentUserAction.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForCurrentUserAction.fulfilled, (state, action) => {
      state.activitiesData = [...state.activitiesData, ...action.payload]
      state.activitiesPage = state.activitiesPage + 1
      state.activitiesStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForCurrentUserAction.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })

    builder.addCase(getPresetsForCurrentUserAction.pending, (state) => {
      state.presetsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getPresetsForCurrentUserAction.fulfilled, (state, action) => {
      state.presetsData = action.payload
      state.presetsStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getPresetsForCurrentUserAction.rejected, (state, action) => {
      state.presetsStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.presetsError = action.payload
      }
    })

    builder.addCase(createActivityAction.pending, (state) => {
      state.createActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(createActivityAction.fulfilled, (state, action) => {
      state.createActivityStatus = RequestStatuses.SUCCESS
      state.activitiesData = [action.payload, ...state.activitiesData]
      state.isAddEditModalOpen = false
      toast("Succesfully created activity")
    })
    builder.addCase(createActivityAction.rejected, (state, action) => {
      state.createActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.createActivityError = action.payload
        toast("There was a problem creating activity")
      }
    })

    builder.addCase(deleteActivityAction.pending, (state) => {
      state.deleteActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(deleteActivityAction.fulfilled, (state, action) => {
      state.deleteActivityStatus = RequestStatuses.SUCCESS
      state.activitiesData = state.activitiesData?.filter(
        (activity) => activity._id !== action.payload._id
      )
      state.currentlyProcessedActivityId = null
      toast("Succesfully deleted activity")
    })
    builder.addCase(deleteActivityAction.rejected, (state, action) => {
      state.deleteActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.deleteActivityError = action.payload
        toast("There was a problem deleting activity")
      }
    })

    builder.addCase(editActivityAction.pending, (state) => {
      state.editActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(editActivityAction.fulfilled, (state, action) => {
      if (state.isEditing) {
        state.isAddEditModalOpen = false
        state.isEditing = false
      }
      state.editActivityStatus = RequestStatuses.SUCCESS
      state.currentlyProcessedActivityId = null
      state.activitiesData = state.activitiesData?.map((activity) => {
        if (activity._id === action.payload._id) {
          return action.payload
        }
        return activity
      })
      toast("Succesfully edited activity")
    })
    builder.addCase(editActivityAction.rejected, (state, action) => {
      state.editActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.editActivityError = action.payload
        toast("There was a problem editing activity")
      }
    })
  },
})

export default userSlice.reducer
export const {
  removePreset,
  setHasMore,
  toggleIsPreset,
  setIsEditing,
  setIsAddEditModalOpen,
  setCurrentlyEditedActivity,
  setCurrentlyProcessedActivityId,
} = userSlice.actions
