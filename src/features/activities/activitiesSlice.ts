import { createSlice, isAnyOf } from "@reduxjs/toolkit"

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
  createEditDeleteStatus: RequestStatuses.IDLE,
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

    builder.addCase(createActivityAction.fulfilled, (state, action) => {
      state.activitiesData = [action.payload, ...state.activitiesData]
    })
    builder.addCase(deleteActivityAction.fulfilled, (state, action) => {
      state.activitiesData = state.activitiesData?.filter(
        (activity) => activity._id !== action.payload._id
      )
    })
    builder.addCase(editActivityAction.fulfilled, (state, action) => {
      state.activitiesData = state.activitiesData?.map((activity) => {
        if (activity._id === action.payload._id) {
          return action.payload
        }
        return activity
      })
    })

    builder.addMatcher(
      isAnyOf(
        createActivityAction.pending,
        editActivityAction.pending,
        deleteActivityAction.pending
      ),
      (state) => {
        state.createEditDeleteStatus = RequestStatuses.LOADING
      }
    )
    builder.addMatcher(
      isAnyOf(
        createActivityAction.fulfilled,
        editActivityAction.fulfilled,
        deleteActivityAction.fulfilled
      ),
      (state) => {
        state.createEditDeleteStatus = RequestStatuses.SUCCESS
        state.isAddEditModalOpen = false
        state.isEditing = false
        state.currentlyProcessedActivityId = null
      }
    )
    builder.addMatcher(
      isAnyOf(
        createActivityAction.rejected,
        editActivityAction.rejected,
        deleteActivityAction.rejected
      ),
      (state, action) => {
        state.createEditDeleteStatus = RequestStatuses.FAILED
        if (action.payload) {
          state.createEditDeleteError = action.payload
        }
      }
    )
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
